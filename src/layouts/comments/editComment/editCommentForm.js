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
// import Select from "examples/selectSearch";
import { fetchApi } from "api";
import { Button, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function EditCommentForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    userName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confrimPassword: "",
    address: "",
    dateTime: "",
    status: "",
  });
  const [showPass,setShowPass]=useState({
    pass:false,
    confirm:false
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
 
    if ((name === "commission" || name === "discodeCount") && Number(value) > 100) {
      return;
    }

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
          userName: data.userName,  
          name: data.name,
          email: data.email,
          phoneNumber: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gendder: data.gendder,
          dateTime: data.dateTime,
          status: data.status,
       
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
        fName: true,
        lName: true,
        email: true,
        country: true,
        password: true,
        confrimPassword: true,
        address: true,
        dateTime: true,
        status: true,
      });
    }
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
              name="username"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              label=" User name "
              isInvalid={errors.username && focus.username}
            />
          </div>
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
              label="  First name & Last name  "
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
              label="Email address"
            />
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="coubtry"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              label=" Country "
              isInvalid={errors.phone && focus.phone}
            />
          </div>
         
          <div className={style.formItem}>
            <Input
              color="light"
              type={!showPass.pass ? "password":"text"}
              name="password"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShowPass({ ...showPass, pass: !showPass.pass })}
                    aria-label="toggle password visibility"
                  >
                    {showPass.pass ? (
                      <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoEye className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
              }
              label=" Password "
              isInvalid={errors.password && focus.password}
            />
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type={showPass.confirm?"text":"password"}
              name="confrimPassword"
              onFocus={focusHandler}
              onChange={changeHandler}
              classNames={{
                input: ["text-[14px]"],
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                  aria-label="toggle password visibility"
                >
                  {showPass.confirm ? (
                    <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
            }
              variant="bordered"
              labelPlacement="outside"
              label=" Confirm password "
              isInvalid={errors.confrimPassword && focus.confrimPassword}
            />
          </div>
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
