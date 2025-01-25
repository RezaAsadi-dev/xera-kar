import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function EditCategoryForm() {
  const catUrl = "api/admin/fetch_one";
  const editcatUrl = "api/admin/update";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    description: "",
    status: "",
    img: "",
  });

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/category", { replace: true });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };
  const getCat = () => {
    fetchApi(catUrl, { collaction: "cat", id: id }, "post").then((res) => {
      if (res.status_code === 200) {
        setData(res?.Data[0]);
        setEdit(!!res?.Data[0].img);
      }
      console.log(res);
    });
  };

  const submitHandler = (event) => {
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        editcatUrl,
        {
          title: data.title,
          description: data.description,
          status: Boolean(data.status),
          img: data.img,
          id: id,
          collaction: "cat",
        },
        "put"
      ).then((res) => {
        if (res.status_code === 200) {
          toast.success(" Category edited successfully! ");
          navigate("/category");
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
        description: true,
        status: true,
        img: true,
      });
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} flex xl:flex-row flex-col justify-center `}>
          <div className="flex flex-col p-5 w-full md:w-[50%]">
            <div className="grid sm:grid-cols-2  gap-4 ">
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="text"
                  name="title"
                  value={data?.title}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  className="w-full"
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
                <Select
                  color="light"
                  name="status"
                  selectedKeys={[String(data?.status) ?? "false"]}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Status"
                  items={[
                    { key: "true", label: "Active" },
                    { key: "false", label: "Inactive" },
                  ]}
                >
                  {(item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="mt-4 ">
              <Textarea
                variant="bordered"
                label="description"
                name="description"
                value={data?.description}
                onChange={changeHandler}
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700 !h-[150px] !w-full"
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
