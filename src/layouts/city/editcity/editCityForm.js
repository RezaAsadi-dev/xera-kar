import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import db from "assets/countries/countries.json";
import animationData from "assets/animation/Animation.json";
import Lottie from "react-lottie-player";

export default function EditCityForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    city: "",
    country: "",
    status: "",
  });

  const deleteHandler = () => {
    navigate("/city", { replace: true });
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
          city: data.name,
          country: data.userName,
          status: data.status,
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" City edited successfully! ");
          navigate("/city");
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
        city: true,
        country: true,
        status: true,
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
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="w-[45%] flex flex-col !gap-y-4 md:flex md:justify-center">
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
                isInvalid={errors.Link && focus.Link}
                variant="bordered"
                labelPlacement="outside"
                label="City Name"
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="Country"
                // onFocus={focusHandler}
                onChange={(e) => selectChange(e)}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="Country"
                // isInvalid={errors.phone && focus.phone}
              >
                {db.map((item) => (
                  <SelectItem key={item.name}>{item.name}</SelectItem>
                ))}
              </Select>
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="Status"
                // onFocus={focusHandler}
                onChange={(e) => selectChange(e)}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="Status"
                // isInvalid={errors.phone && focus.phone}
              >
                {statusSelect.map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Lottie loop animationData={animationData} play className="w-[45%] max-sm:hidden" />
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
