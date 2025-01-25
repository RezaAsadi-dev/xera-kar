import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import style1 from "./Styles.module.css";
export default function EditUserForm() {
  const edditUserUrl = "api/admin/update";
  const url = "api/admin/fetch_one";
  const cityUrl = "api/admin/fetch";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [statusSelect, setStatusSelect] = useState(["active", "deactive"]);
  const [countrySelection, setCountrySelection] = useState();
  const [phone, setPhone] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    dateTime: "",
    status: "",
  });

  const deleteHandler = () => {
    navigate("/users", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const changeHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    const { name, value } = e.target;
    setData({
      ...phone,
      ...data,
      [name]: value,
    });
  };
  const handleOnChange = (value) => {
    const formattedValue = value ? value.replace(/^\+/, "") : "";

    setPhone(formattedValue);
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
    console.log(event.target.name);
  };
  const fetchUser = (e) => {
    dispatch1(handler(true));
    fetchApi(
      url,
      {
        collaction: "user",
        id: id,
      },
      "post"
    )
      .then((res) => {
        if (res?.status_code === 200) {
          setData(res?.Data[0]);
          setPhone(res?.Data[0]?.phoneNumber)
          
          
          dispatch1(handler(false));
        } else {
          toast.error("Something went wrong!");
          dispatch1(handler(false));
        }
      })
      .catch(() => {
        toast.error("Failed to fetch user data.");
        dispatch1(handler(false));
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      fetchApi(
        edditUserUrl,
        {
          collaction: "user",
          id: id,
          name: data.name,
          email: data.email,
          phoneNumber: phone,
          country: data.country,
          city: data.city,
          address: data.address,
          status: data.status,
        },
        "put"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" User edited successfully! ");
          navigate("/Users");
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
        city: true,
        address: true,
        dateTime: true,
        status: true,
      });
    }
  };
  const selectChange = (e) => {
    setData({
      ...data,
      country: e.target.value,
    });
  };

  const countrySelect = (name) => {
    fetchApi(cityUrl, { collaction: "city", query: { country: name }, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          console.log(res);
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
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          {/* <div className={style.logoContainer}>
            <FileUpload datas={data} setDatas={setData} />
            <h5 className="text-[12px] mt-[-20px]"> Choose logo </h5>
          </div> */}
          <div className={style.formItem}>
            <Input
              value={data?.name}
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
          <div className={style.formItem}>
            <Input
              value={data?.email}
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
              label="Email address"
            />
          </div>
          <div className={`${style.formItem} h-full flex flex-col justify-end`}>
            <div className={` h-10 border-2  rounded-lg   `}>
              <PhoneInput
                international
                type="text"
                // name="phoneNumber"
                defaultCountry="US"
                value={data?.phoneNumber}
                onChange={handleOnChange}
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
              value={data?.phoneNumber}
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
              label="  Phone Number  "
              isInvalid={errors.phoneNumber && focus.phoneNumber}
            />
          </div> */}

          <div className={style.formItem}>
            <Select
              selectedKeys={[data?.country]}
              value={data?.country}
              color="light"
              name="country"
              onFocus={focusHandler}
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
                  //  value={item.name}
                >
                  {item.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className={style.formItem}>
            <Select
              value={data?.city}
              color="light"
              name="city"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              label=" City "
              isInvalid={errors.city && focus.city}
            >
              {countrySelection?.map((item) => (
                <SelectItem key={item?.city}>{item?.city}</SelectItem>
              ))}
            </Select>
          </div>
          <div className={style.formItem}>
            <Input
              value={data?.address}
              color="light"
              type="text"
              name="address"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              label=" Address "
              isInvalid={errors.address && focus.address}
            />
          </div>
          <div className=" w-full  flex justify-start ml-[150px] mt-4">
            <Checkbox
              name="status"
              onChange={(e) => {
                changeHandler({
                  target: {
                    name: "status",
                    value: e.target.checked,
                  },
                });
              }}
              color="success"
              isSelected={data.status}
            >
              Status
            </Checkbox>
          </div>
        </form>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          mb={10}
          mt={10}
        >
          <Button
            variant="solid"
            className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3"
            onClick={submitHandler}
          >
            Edit
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
