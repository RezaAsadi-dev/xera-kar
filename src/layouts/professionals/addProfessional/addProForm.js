import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import { handler } from "../../../redux/loaderSlice";
import countriesData from "assets/countries/countries.json";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import style1 from "./Styles.module.css";
export default function AddProForm() {
  const addProUrl = "api/admin/add";
  const cityUrl = "api/admin/fetch";
  const categoryUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const dispatch1 = useDispatch();
  const [errors, setErrors] = useState({});
  const [genderSelect, setgenderSelect] = useState(["male", "female"]);
  const [countrySelection, setCountrySelection] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("US");
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    country: "",
    city: "",
    address: "",
    category: "",
    subcategory: "",
    yearofExperience: "",
    about: "",
    img: "",
    // dateTime: "",
    // status: "",
  });

  const deleteHandler = () => {
    navigate("/professionals", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);

    setData({
      ...data,
      [name]: value,
    });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(errors);

    if (!Object.keys(errors).length) {
      fetchApi(
        addProUrl,
        {
          name: data.name,
          phoneNumber: phone?.replace(/^\+/, ""),
          email: data.email,
          gender: data.gender,
          country: data.country,
          city: data.city,
          address: data.address,
          category: data.category,
          subcategory: data.subcategory,
          yearofExperience: data.yearofExperience,
          about: data.about,
          img: data.img,
          collaction: "company",
          type: "professional",
        },
        "post"
      ).then((res) => {
        if (res.status_code === 200) {
          toast.success(" Professional added successfully! ");
          navigate("/professionals");
        } else if (res.status_code === 401) {
          if (res.description === "unauthorized") {
            navigate("/login", { replace: true });
          }
        } else if (res.status_code === 402) {
          toast.error(res.description_fa_user);
        }
      });
    } else {
      toast.error("Fields must not be empty.")
      setFocus({
        name: true,
        phone: true,
        email: true,
        gender: true,
        country: true,
        city: true,
        address: true,
        category: true,
        subcategory: true,
        yearofExperience: true,
        about: true,
        img: true,
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
          toast.error("Something went wrong!");
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
  const handleOnChange = (value,metadata) => {
    // const formattedValue = value ? value.replace(/^\+/, "") : "";
    // setPhone(formattedValue);
    if (metadata && metadata.country !== country) {
      const newCountry = metadata.country;
      const newCallingCode = `+${getCountryCallingCode(newCountry)}`;
      setPhone(newCallingCode); // مقدار جدید برای پیش‌شماره
      setCountry(newCountry); // ذخیره کشور انتخاب‌شده
    } else {
      setPhone(value); // به‌روزرسانی شماره واردشده
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
                name="name"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Name "
                isInvalid={errors.name && focus.name}
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
                  error={phone.length < 10 ? "Phone number is too short" : ""}
                />
                
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
                label=" Phone Number "
                isInvalid={errors.phoneNumber && focus.phoneNumber}
              />
            </div> */}
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
                variant="bordered"
                labelPlacement="outside"
                label=" Email "
                isInvalid={errors.email && focus.email}
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="gender"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Gender "
                isInvalid={errors.gender && focus.gender}
              >
                {genderSelect.map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
            </div>
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
                isInvalid={errors.country && focus.country}
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
                isInvalid={errors.city && focus.city}
              >
                {countrySelection?.map((item) => (
                  <SelectItem key={item?.city}>{item?.city}</SelectItem>
                ))}
              </Select>
              {/* <Select
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
                  <SelectItem key={item?.city} > {item?.city}</SelectItem>
                ))}
              </Select> */}
            </div>

            <div className={style.formItem}>
              <Input
                color="light"
                type="address"
                name="address"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                isInvalid={errors.address && focus.address}
                variant="bordered"
                labelPlacement="outside"
                label="Address"
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
                isInvalid={errors.category && focus.category}
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
                label="Subcategory "
                isInvalid={errors.subcategory && focus.subcategory}
              >
                {subCategory?.map((item) => (
                  <SelectItem key={item?.title}>{item?.title}</SelectItem>
                ))}
              </Select>
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="yearofExperience"
                name="yearofExperience"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                isInvalid={errors.yearofExperience && focus.yearofExperience}
                variant="bordered"
                labelPlacement="outside"
                label="Years of Experience"
              />
            </div>
          </div>
          <div className="md:w-1/3 relative mr-6">
            <FileUploader data={data} setData={setData} />
          </div>
          <div className=" flex flex-col md:w-[51%]  w-full sm:justify-start lg:pr-8 ml-4 mt-4">
            <Textarea
              variant="bordered"
              label="About Professional"
              name="about"
              labelPlacement="outside"
              placeholder="Enter your description"
              onChange={changeHandler}
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
          mb={7}
          mt={5}
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
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
