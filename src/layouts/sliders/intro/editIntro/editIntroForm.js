import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function EditIntroForm() {
  const editIntroUrl = "api/admin/update";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    Description: "",
    img: "",
  });
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const deleteHandler = () => {
    navigate("/slider/intro", { replace: true });
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
    console.log(!!Object.keys(errors).length);
    console.log(Object.keys(errors).length);
    if (!!Object.keys(errors).length) {
      fetchApi(
        editIntroUrl,
        {
          title: data.title,
          Description: data.Description,
          img: data.img,
          id: data._id,
          collaction: "adv",
        },
        "put"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success("Intro edited successfully! ");
          navigate("/slider/intro");
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
        Description: true,
        img: true,
      });
    }
  };
  const urlOne = "api/admin/fetch_one";
  const fetchone = () => {
    fetchApi(urlOne, { collaction: "adv", id: id }, "post").then((res) => {
      setData(res.Data[0]);
      setEdit(!!res.Data[0].img);
    });
  };

  useEffect(() => {
    fetchone();
  }, []);
  console.log(data);
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} flex justify-center gap-4`}>
          <div className="flex flex-col p-5 w-full md:w-[50%]">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="title"
                value={data.title}
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Title  "
                isInvalid={errors.username && focus.username}
              />
            </div>

            <div className="mt-4">
              <Textarea
                variant="bordered"
                name="Description"
                value={data.Description}
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700 !w-[90%] "
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
            {" "}
            Cancel{" "}
          </Button>
        </Stack>
      </div>
    </>
  );
}
