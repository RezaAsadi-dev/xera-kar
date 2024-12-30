import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { FaCheck } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json"

export default function EditUserForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    dateTime: "",
    status: "",
  });
  
  const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    width: 150,
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  const ButtonStyle2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    width: 150,
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));
  const deleteHandler = () => {
    navigate("/users", { replace: true });
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
          email: data.email,
          phoneNumber: data.phone,
          country: data.country,
          city: data.city,
          dateTime: data.dateTime,
          status: data.status,
       
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" User registered successfully! ");
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
        phone: true,
        country: true,
        city: true,
        address: true,
        dateTime: true,
        status: true,
      });
    }
  };
  const selectChange = (e) => {
    console.log(e.target.value);
  };
 
  useEffect(()=>{
  console.log(data);
  
  },[data])
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
              isInvalid={errors.username && focus.username}
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
              label="Email address"
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
              label="  Phone Number  "
              isInvalid={errors.name && focus.name}
            />
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
                <SelectItem key={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="adderss"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              label=" City "
              isInvalid={errors.city && focus.city}
            />
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="adderss"
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
                  <Checkbox color="success" defaultSelected>
                    Status
                  </Checkbox>
                </div>
          {/* <div className={style.formItem}>
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
              label="Status"
              // isInvalid={errors.phone && focus.phone}
            >
              {statusSelect.map((item) => (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          </div> */}
        </form>
       
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} mb={10} mt={10}>
          <Button variant="solid" className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3"  onClick={submitHandler}>
            Edit
          </Button>
          <Button variant="flat" className="w-[130px] bg-red-500 text-white "  onClick={deleteHandler}> Cancel </Button>
        </Stack>
      </div>
    </>
  );
}
