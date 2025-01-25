import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
// import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function AddAdvisementForm() {
  const addAdvismentUrl = "api/admin/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    link: "",
    img: "",
  });
 
  const deleteHandler = () => {
    navigate("/slider/advisement", { replace: true });
  };

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
        addAdvismentUrl,
        {
          title: data.title,
          link: data.link,
          img: data.img,
          collaction:"adv",
          type:"advisement"
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Advisement added successfully! ");
          navigate("/advisement");
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
        title: true,
        link: true,
        img: true,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="flex flex-col p-5 w-full md:w-[50%]">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="title"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="Title"
                isInvalid={errors.title && focus.title}
              />
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="link"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Link "
                isInvalid={errors.link && focus.link}
              />
            </div>
          </div>
          <div className={`w-1/3 relative `}>
            <FileUploader data={data} setData={setData} />
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
