import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import countriesData from "assets/countries/countries.json";

export default function AddProForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [genderSelect, setgenderSelect] = useState(["male", "female"]);
  const [data, setData] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    category: "",
    yearofExperience: "",
    dateTime: "",
    status: "",
  });
 
  const deleteHandler = () => {
    navigate("/professionals", { replace: true });
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

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        addProUrl,
        {
          name: data.name,
          phoneNumber: data.phone,
          email: data.email,
          gender: data.gender,
          country: data.country,
          city: data.city,
          address: data.address,
          category: data.category,
          dubcategory: data.subcategory,
          yearOfExperience: data.yearOfExperience,
          img: data.img,
          status: data.status,
          dateTime: data.dateTime,
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Professional registered successfully! ");
          navigate("/professional/professionallist");
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
        phone: true,
        email: true,
        gender: true,
        country: true,
        city: true,
        address: true,
        category: true,
        subcategory: true,
        yearOfExperience: true,
        img: true,
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
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} flex md:flex-row flex-col justify-center sm:flex-col sm:justify-center`}>
            <div className="flex flex-col justify-center p-5 w-full md:w-1/3">
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
                  isInvalid={errors.lName && focus.lName}
                />
              </div>
              <div className={style.formItem}>
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
                  isInvalid={errors.phone && focus.phone}
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
                  onChange={selectChange}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Gender "
                  isInvalid={errors.gender && focus.gender}
                >
                  {genderSelect.map((item) => (
                    <SelectItem key={item.key} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="status"
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
            </div>
            <div className="flex flex-col justify-center p-5 w-full md:w-1/3">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="city"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" City "
                isInvalid={errors.email && focus.email}
              />
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
                isInvalid={errors.email && focus.email}
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
                type="yearofExperience"
                name="yearofExperience"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                isInvalid={errors.email && focus.email}
                variant="bordered"
                labelPlacement="outside"
                label="Years of Experience"
              />
            </div>
          </div>
          <div className="relative w-1/3">
            <FileUploader />
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
            {" "}
            Cancel{" "}
          </Button>
        </Stack>
      </div>
    </>
  );
}
