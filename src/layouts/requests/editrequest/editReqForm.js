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
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function EditReqForm() {
  const editReqUrl = "v1/api/admin/agent/update";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [data, setData] = useState({
    title: "",
    image: "",
    category: "",
    subCategory: "",
    description: "",
    address: "",
    deadline: "",
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
    navigate("/requests", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        editReqUrl,
        {
          title: data?.name,
          category: data?.address,
          subCategory: data?.email,
          deadline: data?.dateTime,
          status: data?.status,
        },
        "post"
      ).then((res) => {
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
        title: true,
        category: true,
        subCat: true,
        deadline: true,
        status: true,
      });
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const selectChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className={`${style.addContainer} `}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="2xl:flex 2xl:justify-center ">
            <div className=" w-[400px] lg:w-[800px] flex flex-wrap justify-center space-y-4  ">
              <div className={`${style.formItem} justify-center`}>
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
                  label=" Title "
                  isInvalid={errors.username && focus.username}
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
                  <SelectItem key="programming1">Programming</SelectItem>
                  <SelectItem key="programming2">Programming</SelectItem>
                  <SelectItem key="programming3">Programming</SelectItem>
                  <SelectItem key="programming4">Programming</SelectItem>
                  <SelectItem key="programming5">Programming</SelectItem>
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
                  type="date"
                  name="deadline"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Deadline "
                  isInvalid={errors.phone && focus.phone}
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full  md:w-[76%]  mt-10  md:mt-[-20px] ">
                <Textarea
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description..."
                  className="text-gray-700 !w-[90%]"
                />
                <div className=" w-full  flex justify-start ml-12 mt-4">
                  <Checkbox color="success" defaultSelected>
                    Status
                  </Checkbox>
                </div>
              </div>
            </div>

            <div className={"flex justify-center "}>
              <FileUploader />
            </div>
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
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
