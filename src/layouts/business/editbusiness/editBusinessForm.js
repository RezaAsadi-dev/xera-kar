import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json";
import { Card } from "@mui/material";

export default function EditBusinessForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    coName: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateTime: "",
    status: "",
    images: [
      { id: 1, url: "https://via.placeholder.com/150" },
      { id: 2, url: "https://via.placeholder.com/150/0000FF" },
      { id: 3, url: "https://via.placeholder.com/150/FF0000" },
    ],
    video: {
      id: 1,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  });

  const deleteHandler = () => {
    navigate("/business", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  // add data on the table from Api
  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        addProUrl,
        {
          coName: data.coName,
          coPhoneNumber: data.phone,
          email: data.email,
          country: data.country,
          address: data.address,
          services_products: data.address,
          category: data.category,
          yearOfExperience: data.yearOfExperience,
          coWebsite: data.coWebsite,
          coAbout: data.coAbout,
          status: data.status,
          dateTime: data.dateTime,
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Business added successfully! ");
          navigate("/busineess");
        } else if (res.status_code === 401) {
          if (res.description === "unauthorized") {
            navigate("/login", { replace: true });
          }
        } else if (res.status_code === 402) {
          toast.error(res.description_fa_user);
        }
      });
    } else {
      setFocus({
        coName: true,
        email: true,
        coPhoneNumber: true,
        country: true,
        coAddress: true,
        services_products: true,
        category: true,
        yearOfExperience: true,
        coWebsite: true,
        coAbout: true,
        status: true,
        dateTime: true,
      });
    }
  };
  const selectChange = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [mediaItems, setMediaItems] = useState([
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "First Image",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Second Image",
    },
    {
      type: "video",
      url: "https://www.w3schools.com/html/movie.mp4",
      caption: "Sample Video",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Third Image",
    },
  ]);
  const handleDeleteMedia = (url) => {
    const updatedMediaItems = mediaItems.filter((item) => item.url !== url);
    setMediaItems(updatedMediaItems);

    // Reset selected media if the deleted one was selected
    if (selectedMedia.url === url) {
      setSelectedMedia(updatedMediaItems[0] || null);
    }
  };
  const handleAddMedia = () => {
    // Simulate adding a new image (you can replace this with your actual file upload logic)
    const newMedia = {
      url: "https://via.placeholder.com/800", // Replace with uploaded media URL
      type: "image", // Adjust based on the uploaded file type
    };
    setMediaItems([...mediaItems, newMedia]);
  };
  const [selectedMedia, setSelectedMedia] = useState(mediaItems[0]);

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm}  !grid !grid-cols-1 md:!grid-cols-2 gap-6`}>
          <div className="!md:mt-[-150px] sm:mt-[-150px]">
            <div className="grid  sm:grid-cols-2">
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="coName"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company name "
                  isInvalid={errors.username && focus.username}
                />
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="number"
                  name="coPhoneNumber"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="  Company Phone  "
                  isInvalid={errors.name && focus.name}
                />
              </div>

              <div className={style.formItem}>
                <Input
                  color="light"
                  type="email"
                  name="email"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  isInvalid={errors.email && focus.email}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Email"
                />
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="country"
                  // onFocus={focusHandler}
                  onChange={selectChange}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Country"
                  // isInvalid={errors.phone && focus.phone}
                >
                  {countriesData.map((item) => (
                    <SelectItem key={item.name}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="select"
                  name="coAddress"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company Address "
                  isInvalid={errors.email && focus.email}
                />
              </div>

              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="services_products"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Services & Products "
                  isInvalid={errors.email && focus.email}
                />
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="category"
                  // onFocus={focusHandler}
                  // onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Category "
                  // isInvalid={errors.phone && focus.phone}
                >
                  <SelectItem key="programming">Programming</SelectItem>
                  <SelectItem key="programming">Programming</SelectItem>
                  <SelectItem key="programming">Programming</SelectItem>
                  <SelectItem key="programming">Programming</SelectItem>
                  <SelectItem key="programming">Programming</SelectItem>
                  <SelectItem key="programming">Programming</SelectItem>
                </Select>
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="subcategory"
                  // onFocus={focusHandler}
                  // onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Subcategory "
                  // isInvalid={errors.phone && focus.phone}
                >
                  <SelectItem key="frontend">frontend</SelectItem>
                  <SelectItem key="backend">backend</SelectItem>
                  <SelectItem key="ui-ux">ui-ux</SelectItem>
                  <SelectItem key="devops">devops</SelectItem>
                </Select>
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="number"
                  name="yearOfExperience"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Year Of Experience "
                  isInvalid={errors.email && focus.email}
                />
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="link"
                  name="coWebsite"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company Website "
                  isInvalid={errors.email && focus.email}
                />
              </div>
            </div>
            <div className={`${style.formItem} !w-[95%] `}>
              <Textarea
                variant="bordered"
                label="About Professional"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700  "
              />
            </div>
          </div>
          <div className="">
            <Card>
              {/* Main Media Display */}
              <div
                className="main-media-display"
                style={{ textAlign: "center", marginBottom: "20px", position: "relative" }}
              >
                {/* Delete Button */}
                {selectedMedia && (
                  <button
                    onClick={() => handleDeleteMedia(selectedMedia.url)} // Delete handler
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </button>
                )}
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.url}
                    alt="Selected"
                    style={{ width: "100%", maxWidth: "800px", height: "auto" }}
                  />
                ) : (
                  <video style={{ width: "100%", maxWidth: "800px", height: "auto" }} controls>
                    <source src={selectedMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Horizontal Slider */}
              <div
                className="slide-container"
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  paddingBottom: "10px",
                  paddingRight: "5px",
                }}
              >
                {mediaItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "5px 10px",
                      cursor: "pointer",
                      opacity: selectedMedia.url === item.url ? 1 : 0.6, // Highlight selected media
                      transition: "opacity 0.3s",
                    }}
                    onClick={() => setSelectedMedia(item)} // Update selected media
                  >
                    {item.type === "image" ? (
                      <img
                        style={{
                          width: "120px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        src={item.url}
                        alt={`thumbnail-${index}`}
                      />
                    ) : (
                      <video
                        style={{
                          width: "120px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        muted
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}

                {/* Add New Media Button */}
                <div
                  style={{
                    width: "120px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                    margin: "5px 10px",
                  }}
                  onClick={handleAddMedia} // Add new media handler
                >
                  <span style={{ fontSize: "24px", color: "#999" }}>+</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full flex justify-center !md:mt-[-70px] sm:mt-[-70px] gap-4 mb-6">
            <Button
              variant="solid"
              className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3 mb-4"
              onClick={submitHandler}
            >
              Edit
            </Button>
            <Button
              variant="flat"
              className="w-[130px] bg-red-500 text-white ml-3 "
              onClick={deleteHandler}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
