import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
// import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function AddAdvisementForm({ info }) {
  console.log(info);
  const editUrl = "api/admin/update";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    link: "",
    img: "",
  });
  const { id } = useParams();
  const url = "api/admin/fetch_one";

  const fetch = () => {
    fetchApi(url, { collaction: "adv", id: id }, "post").then((res) => {
      if (res.status_code === 200) {
        setData(res?.Data[0]);
        setEdit(!!res?.Data[0]?.img);
      }
    });
  };
  const [edit, setEdit] = useState(false);
  console.log(data);

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
        editUrl,
        {
          title: data.title,
          link: data.link,
          img: data.img,
          collaction: "adv",
          id: id,
        },
        "put"
      ).then((res) => {
        if (res.status_code === 200) {
          toast.success(" Advisement Edited successfully! ");
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
    fetch();
    // setEdit(!!info?.img);
  }, []);
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
                value={data?.title}
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Title "
                isInvalid={errors.username && focus.username}
              />
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="link"
                value={data?.link}
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Link "
                isInvalid={errors.name && focus.name}
              />
            </div>
          </div>
          {edit ? (
            <div className={`w-1/3 relative`}>
              <img className="rounded-lg" src={data.img} alt={data.title} />
              <div className="mt-3">
                <Button color="danger" onClick={() => setEdit(!edit)}>
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <div className={`w-1/3 relative`}>
              <FileUploader setData={setData} />
            </div>
          )}
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
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
