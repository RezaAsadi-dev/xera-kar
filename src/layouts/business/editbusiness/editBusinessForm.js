import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import { IoImageOutline } from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import style1 from "./Styles.module.css";
export default function EditBusinessForm() {
  const editBusinessUrl = "api/admin/update";
  const businessUrl = "api/admin/fetch_one";
  const cityUrl = "api/admin/fetch";
  const categoryUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const { id } = useParams();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [countrySelection, setCountrySelection] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const dispatch1 = useDispatch();
  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [updateData, setUpdateData] = useState();
  const [mediaItems, setMediaItems] = useState([]);
  const [portfolioVideo, setPortfolioVideo] = useState("");
  const [country, setCountry] = useState("US");
  const deleteHandler = () => {
    navigate("/business", { replace: true });
  };

  // useEffect(() => {
  //   setErrors(validate(data));
  // }, [data, focus]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, "=>", value);

    setData({
      ...data,
      [name]: value,
    });
    setUpdateData({
      id,
      collaction: "company",
      portfolioImgs: mediaItems,
      phoneNumber: phone,
      ...updateData,
      [name]: value,
    });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  // add data on the table from Api
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(errors);
    if (!Object.keys(errors).length) {
      fetchApi(editBusinessUrl, updateData, "put").then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Business added successfully! ");
          navigate("/business");
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
        name: true,
        email: true,
        phoneNumber: true,
        country: true,
        address: true,
        services: true,
        category: true,
        yearofExperience: true,
        companyWebsite: true,
        coAbout: true,
        status: true,
        dateTime: true,
      });
    }
  };

  const getBusiness = () => {
    dispatch1(handler(true));
    fetchApi(businessUrl, { collaction: "company", id }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        console.log(res?.Data[0]);

        setData(res?.Data[0]);
        setMediaItems(res?.Data[0]?.portfolioImgs);
        setPortfolioVideo(res?.Data[0]?.portfolioVideo);
        setPhone(res?.Data[0]?.phoneNumber);
        // setnumber(res?.count);
        // setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  };
  const countrySelect = (name) => {
    dispatch1(handler(true));
    fetchApi(cityUrl, { collaction: "city", query: { country: name }, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          // console.log(res);
          setCountrySelection(res?.data);
          // setData(res?.data);
          // setnumber(res?.count);
          // setTotalPages(res?.max_page);
        } else {
          dispatch1(handler(false));
          toast.error("  Something went wrong!");
        }
      }
    );
    // console.log(name);
  };
  const getCategory = () => {
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "cat", query: {}, page: "all" }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        // console.log(res);

        setCategory(res?.data);
        // setnumber(res?.count);
        // setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  const categorySelect = (id) => {
    // console.log(id);
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "subcat", query: { catid: id }, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          // console.log(res?.data);

          setSubCategory(res?.data);
        } else {
          dispatch1(handler(false));
          toast.error("Something went wrong!");
        }
      }
    );
  };

  const [selectedMedia, setSelectedMedia] = useState();

  const handleDeleteMedia = (url) => {
    console.log(url.split(".").pop());

    const updatedMediaItems = mediaItems.filter((item) => item !== url);
    setMediaItems(updatedMediaItems);
    if (url.split(".").pop() === "mp4") {
      // console.log("1");
      setPortfolioVideo("")
      setUpdateData({
        id,
        collaction: "company",
        portfolioImgs: updatedMediaItems,
        portfolioVideo: "",
      });
    } else {
      // console.log("2");
      setUpdateData({
        id,
        collaction: "company",
        portfolioImgs: updatedMediaItems,
        portfolioVideo,
      });
    }

    // Reset selected media if the deleted one was selected
    if (selectedMedia === url) {
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

  const handleOnChange = (value, metadata) => {
    if (metadata && metadata.country !== country) {
      const newCountry = metadata.country;
      const newCallingCode = `+${getCountryCallingCode(newCountry)}`;
      newCallingCode.setPhone(newCallingCode); 
      setCountry(newCountry); 
    }else {
      setPhone(value); 
    }
    setUpdateData({
      id,
      collaction: "company",
      portfolioImgs: mediaItems,
      ...updateData,
      phoneNumber: value?.replace(/^\+/, ""),
    });
  };

  useEffect(() => {
    if (mediaItems) {
      if (!selectedMedia && mediaItems?.length > 0) {
        setSelectedMedia(mediaItems[0]);
      }
    }
  }, [selectedMedia, mediaItems]);
  useEffect(() => {
    console.log(data, "update:", updateData);
    getCategory();
    getBusiness();
  }, []);
  console.log(updateData);

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} !grid !grid-cols-1 2xl:!grid-cols-2 gap-6`}>
          <div className=" px-4">
            <div className="grid  sm:grid-cols-2">
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="name"
                  value={data?.name}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company name "
                  isInvalid={errors.name && focus.name}
                />
              </div>
              <div className=" h-full flex flex-col justify-end">
                <div className={`${style.formItem} h-10 border-2  rounded-lg   `}>
                  <PhoneInput
                    international
                    type="text"
                    // name="phoneNumber"
                    defaultCountry="US"
                    value={data?.phoneNumber}
                    onChange={(value, metadata) => handleOnChange(value, metadata)}
                    limitMaxLength
                    className={`${style1.phoneInput} !outline-none`}
                    placeholder="Enter phone number"
                  />
                  {/* {phone === "" && (
                <span className={style1.error}>Please enter a valid phone number</span>
              )} */}
                </div>
              </div>
              {/* <div className={style.formItem}>
                <Input
                  color="light"
                  type="number"
                  value={data?.phoneNumber}
                  name="phoneNumber"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="  Company Phone  "
                  isInvalid={errors.phoneNumber && focus.phoneNumber}
                />
              </div> */}

              {/* <div className={style.formItem}>
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
              </div> */}
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="country"
                  // onFocus={focusHandler}
                  onChange={changeHandler}
                  value={data?.country}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Country"
                  // isInvalid={errors.phone && focus.phone}
                >
                  {countriesData.map((item) => (
                    <SelectItem
                      key={item.name}
                      onClick={() => {
                        countrySelect(item.name);
                      }}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="city"
                  value={data?.city}
                  // onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="City"
                  // isInvalid={errors.phone && focus.phone}
                >
                  {countrySelection?.map((item) => (
                    <SelectItem key={item?.city}> {item?.city}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="address"
                  value={data?.address}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company Address "
                  isInvalid={errors.address && focus.address}
                />
              </div>

              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="services"
                  value={data?.services}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Services & Products "
                  isInvalid={errors.services && focus.services}
                />
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="category"
                  value={data?.category}
                  // onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Category "
                  // isInvalid={errors.phone && focus.phone}
                >
                  {category?.map((cat) => (
                    <SelectItem
                      onClick={() => {
                        categorySelect(cat._id);
                      }}
                      key={cat?.title}
                    >
                      {cat?.title}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="subcategory"
                  value={data?.subcategory}
                  // onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Subcategory "
                  // isInvalid={errors.phone && focus.phone}
                >
                  {subCategory?.map((item) => (
                    <SelectItem key={item?.title}>{item?.title}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="number"
                  name="yearofExperience"
                  value={data?.yearofExperience}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Year Of Experience "
                  isInvalid={errors.yearofExperience && focus.yearofExperience}
                />
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="companyWebsite"
                  value={data?.companyWebsite}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Company Website "
                  isInvalid={errors.companyWebsite && focus.companyWebsite}
                />
              </div>
            </div>
            <div className={`${style.formItem} !w-[95%] `}>
              <Textarea
                variant="bordered"
                label="About Company"
                value={data?.about}
                name="about"
                onChange={changeHandler}
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700 "
                isInvalid={errors.about && focus.about}
              />
            </div>
          </div>
          <div className=" grid md:grid-cols-2 gap-4 ">
                      {mediaItems && (
                        <>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              position: "relative",
                              overflowY: "auto",
                              height: "100%",
                              maxWidth: "800px",
                            }}
                          >
                            {/* Main Media Display */}
                            <div
                              className="main-media-display"
                              style={{ textAlign: "center", marginBottom: "20px", position: "relative" }}
                            >
                              {/* Delete Button */}
                              {mediaItems.length > 0 ? (
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDeleteMedia(selectedMedia);
                                    }}
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
          
                                  <img
                                    className="object-cover rounded"
                                    style={{ width: "auto", maxHeight: "500px" }}
                                    src={selectedMedia}
                                    // alt="Selected"
                                  />
                                </div>
                              ) : (
                                <div className=" w-[500px] flex justify-center items-center h-[500px] ">
                                  <IoImageOutline className=" text-9xl" />
                                </div>
                              )}
                              {/* {selectedMedia.type === "image" ? (
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
                          )} */}
                            </div>
          
                            {/* Horizontal Slider */}
                            <div
                              className="slide-container"
                              style={{
                                display: "flex",
                                overflowX: "auto",
                                paddingBottom: "10px",
                                paddingRight: "5px",
                              }}
                            >
                              {mediaItems?.map((item, index) => (
                                <div
                                  key={index}
                                  style={{
                                    margin: "5px 10px",
                                    cursor: "pointer",
                                    opacity: selectedMedia === item ? 1 : 0.6, // Highlight selected media
                                    transition: "opacity 0.3s",
                                  }}
                                  onClick={() => setSelectedMedia(item)} // Update selected media
                                >
                                  <img
                                    style={{
                                      width: "120px",
                                      height: "80px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                    src={item}
                                    alt={`thumbnail-${index}`}
                                  />
                                  {/* <video
                                  style={{
                                    width: "120px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                  muted
                                >
                                  <source src={item} type="video/mp4" />
                                </video> */}
                                  {/* {item.type === "image" ? (
                                <img
                                  style={{
                                    width: "120px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                  src={item}
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
                              )} */}
                                </div>
                              ))}
          
                              {/* Add New Media Button */}
                              {/* <div
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
                          </div> */}
                            </div>
                          </Card>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              position: "relative",
                              overflowY: "auto",
                              height: "100%",
                              maxWidth: "800px",
                            }}
                          >
                           
                            {portfolioVideo ? (
                              <div>
                                 <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteMedia(portfolioVideo);
                              }}
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
                                <video style={{ width: "100%", maxWidth: "800px", height: "auto" }} controls>
                                  <source src={portfolioVideo} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center h-[500px]">
                                <IoImageOutline className=" text-9xl" />
                              </div>
                            )}
                          </Card>
                        </>
                      )}
                    </div>
          <div className="w-full">
            <div className="w-full flex justify-center  gap-4 mb-6">
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
          </div>
        </form>
      </div>
    </>
  );
}
