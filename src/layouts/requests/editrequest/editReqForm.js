import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.scss";
import { FaCheck } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Checkbox, image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";

export default function EditReqForm() {
  const editReqUrl = "api/admin/update";
  const categoryUrl = "api/admin/fetch";
  const requestUrl = "api/admin/fetch_one";
  const dispatch1 = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [edit, setEdit] = useState(false);
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [data, setData] = useState({
    title: "",
    img: "",
    category: "",
    subCategory: "",
    description: "",
    deadline: "",
    status: "",
  });
  const [updateData, setUpdateData] = useState();

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
          title: data?.title,
          category: data?.category,
          projectImg: data?.img,
          subCategory: data?.subCategory,
          deadline: data?.deadline,
          description: data?.description,
          status: data?.status,
          collaction: "request",
          id,
        },
        "put"
      ).then((res) => {
        if (res.status_code === 200) {
          toast.success(" Professional edited successfully! ");
          navigate("/requests");
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
    console.log("name:>", name, "value :>", value);

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const getRequest = () => {
    dispatch1(handler(true));
    fetchApi(requestUrl, { collaction: "request", id }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.Data[0]);
        setEdit(!!res?.Data[0].projectImg);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  };
  const getCategory = () => {
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "cat", query: {}, page: "all" }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        // console.log(res);

        setCategory(res?.data);
        // setnumber(res?.count);
        // setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  const categorySelect = (id) => {
    // console.log(id);
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "subcat", query: { catid: id }, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          // console.log(res?.data);

          setSubCategory(res?.data);
        } else {
          dispatch1(handler(false));
          toast.error("Something went wrong!");
        }
      }
    );
  };

  useEffect(() => {
    getRequest();
    getCategory();
  }, []);

  return (
    <>
      <div className={`${style.addContainer} `}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="2xl:flex 2xl:justify-center ">
            <div className=" w-[400px] lg:w-[800px] flex flex-wrap justify-center  gap-y-5  ">
              <div className={`${style.formItem} `}>
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
                  isInvalid={errors.title && focus.title}
                />
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="category"
                  // onFocus={focusHandler}
                  onChange={changeHandler}
                  selectedKeys={[data?.category]}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Category "
                  // isInvalid={errors.phone && focus.phone}
                >
                  {category?.map((cat) => (
                    <SelectItem
                      onClick={() => {
                        categorySelect(cat._id);
                      }}
                      key={cat?.title}
                    >
                      {cat?.title}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Select
                  color="light"
                  name="subcategory"
                  // onFocus={focusHandler}
                  selectedKeys={[data?.subcategory]}
                  onChange={changeHandler}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Subcategory "
                  // isInvalid={errors.phone && focus.phone}
                >
                  {subCategory?.map((item) => (
                    <SelectItem key={item?.title}>{item?.title}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type="date"
                  name="deadline"
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  value={data?.deadline}
                  classNames={{
                    input: ["text-[14px]"],
                  }}
                  variant="bordered"
                  labelPlacement="outside"
                  label=" Deadline "
                  isInvalid={errors.deadline && focus.deadline}
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full  md:w-[76%]  mt-10  md:mt-[-20px] ">
                <Textarea
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  value={data?.description}
                  onChange={changeHandler}
                  name="description"
                  placeholder="Enter your description..."
                  className="text-gray-700 !w-[90%]"
                />
                <div className="w-full flex justify-start ml-12 mt-4">
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
              </div>
            </div>

           
          </div>
          {edit ? (
              <div className={` relative `}>
                <img className="rounded-lg  w-[500px] h-[500px] object-contain " src={data?.projectImg} alt={data.title} />
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
