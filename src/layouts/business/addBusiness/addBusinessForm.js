import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json";
import FileUploader from "components/fileuploader/uploader";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import style1 from "./Styles.module.css";
export default function AddBusinessForm() {
  const addUrl = "api/admin/add";
  const cityUrl = "api/admin/fetch";
  const categoryUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const [focus, setFocus] = useState({});
  const [countrySelection, setCountrySelection] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("US");
  const [data, setData] = useState({
    coName: "",
    phoneNumber: "",
    email: "",
    country: "",
    coAddress: "",
    services_products: "",
    category: "",
    img: "",
    subcategory: "",
    yearOfExperience: "",
    coWebsite: "",
    description: "",
    // status: "",
  });

  const deleteHandler = () => {
    navigate("/business", { replace: true });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

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
    console.log(errors);

    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        addUrl,
        {
          name: data.coName,
          phoneNumber: phone?.replace(/^\+/, ""),
          // email: data.email,
          country: data.country,
          city: data.city,
          address: data.coAddress,
          services: data.services_products,
          category: data.category,
          subcategory: data.subcategory,
          yearofExperience: data.yearOfExperience,
          companyWebsite: data.coWebsite,
          about: data.description,
          img: data.img,
          collaction: "company",
          type: "business",
        },
        "post"
      ).then((res) => {
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
        coName: true,
        phoneNumber: true,
        email: true,
        country: true,
        coAddress: true,
        services_products: true,
        category: true,
        subcategory: true,
        yearOfExperience: true,
        coWebsite: true,
        description: true,
        status: true,
        dateTime: true,
      });
    }
  };
  const countrySelect = (name) => {
    dispatch1(handler(true));
    fetchApi(cityUrl, { collaction: "city", query: { country: name }, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          setCountrySelection(res?.data);
        } else {
          dispatch1(handler(false));
          toast.error("  Something went wrong!");
        }
      }
    );
  };
  const getCategory = () => {
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "cat", query: {}, page: "all" }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setCategory(res?.data);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  const categorySelect = (id) => {
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
  const handleOnChange = (value,metadata) => {
    if (metadata && metadata.country !== country) {
      const newCountry = metadata.country;
      const newCallingCode = `+${getCountryCallingCode(newCountry)}`;
      setPhone(newCallingCode); 
      setCountry(newCountry); 
    } else {
      setPhone(value); 
    }
  };
  
  

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm}  flex  justify-between sm:px-20`}>
          <div className="grid md:grid-cols-2 w-full md:w-1/2 ml-4">
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
                isInvalid={errors.coName && focus.coName}
              />
            </div>
            <div className=" h-full flex flex-col justify-end">
              <div className={`${style.formItem} h-10 border-2  rounded-lg   `}>
              <PhoneInput
                  international
                  type="text"
                  // name="phoneNumber"
                  defaultCountry={country}
                  value={phone}
                  // onChange={handleOnChange}
                  onChange={(value, metadata) => handleOnChange(value, metadata)}
                  limitMaxLength
                  
                  inputClassName="custom-phone-input-field"
                  // isInvalid={errors.phoneNumber && focus.phoneNumber}
                  className={`${style1.phoneInput} !outline-none`}
                  placeholder="Enter phone number"
                  error={phone?.length < 10 ? "Phone number is too short" : ""}
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
                  <SelectItem key={item?.city}>{item?.city}</SelectItem>
                ))}
              </Select>
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="coAddress"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Company Address "
                isInvalid={errors.coAddress && focus.coAddress}
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
                isInvalid={errors.services_products && focus.services_products}
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="category"
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
                name="yearOfExperience"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Year Of Experience "
                isInvalid={errors.yearOfExperience && focus.yearOfExperience}
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
                isInvalid={errors.coWebsite && focus.coWebsite}
              />
            </div>
          </div>
          <div className="md:w-1/3 relative mr-6">
            <FileUploader data={data} setData={setData} />
            {/* <h5 className="text-[12px] mt-[-20px]"> Choose image </h5> */}
          </div>
          <div className=" flex flex-col md:w-[51%]  w-full sm:justify-start lg:pr-8 ml-4 mt-4">
            <Textarea
              variant="bordered"
              label="About Company"
              name="description"
              onChange={changeHandler}
              labelPlacement="outside"
              placeholder="Enter your description"
              className="text-gray-700 "
              isInvalid={errors.description && focus.description}
            />
          </div>
        </form>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          mb={6}
          mt={6}
        >
          <Button
            variant="solid"
            className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3"
            onClick={submitHandler}
          >
            Add
          </Button>
          <Button
            variant="flat"
            className="w-[130px] bg-red-500 text-white "
            onClick={deleteHandler}
          >
            {" "}
            Cancel{" "}
          </Button>
        </Stack>
      </div>
    </>
  );
}
