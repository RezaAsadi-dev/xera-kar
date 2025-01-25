import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { handler } from "../../../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
// import style from "./editModal.module.scss";
import style from "./categoryModal.module.scss";
import { Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import SoftTypography from "components/SoftTypography";
import { useParams } from "react-router-dom";

const categoryModal = ({ closeModal, fetchData, info }) => {
  const dispatch = useDispatch();
  const url = "api/admin/add";
  const { id } = useParams();
  console.log(id);
  const [editedData, setEditedData] = useState({ ...info });
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    collaction: "subcat",
    catid: id,
  });
  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const Addfetch = () => {
    console.log(data);
    dispatch(handler(true));
    fetchApi(url, data, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch(handler(false));
        closeModal();
        fetchData();
      } else {
        closeModal();
        dispatch(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };

  const RedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    width: 100,
    "&:hover": {
      backgroundColor: red[700],
    },
  }));

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
    width: 100,
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  return (
    <div
      className={style.modal}
      onClick={() => {
        closeModal(false);
      }}
    >
      <div className={style.formContainer} onClick={(e) => e.stopPropagation()}>
        <div className=" flex justify-center">
          {" "}
          <SoftTypography>Add Subcategory</SoftTypography>
        </div>

        <form className={`${style.contantAddForm}  justify-center gap-4`}>
          <div className=" w-full gap-4 mb-10">
            <div className=" flex justify-center items-center gap-5 w-[80%] m-auto">
              <div className={`${style.formItem} w-full`}>
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
                  label=" Title  "
                  isInvalid={errors.username && focus.username}
                />
              </div>

              <div className={`${style.formItem} w-full`}>
                <Select
                  color="light"
                  name="status"
                  // onFocus={focusHandler}
                  onChange={changeHandler}
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
            <div className="flex !justify-center !items-center !w-[80%] mt-[25px] m-auto">
              <Textarea
                name="description"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description..."
                className="text-gray-700"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className={`flex justify-center mt-10 w-full `}>
            <FileUploader setData={setData} />
          </div>
        </form>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <GreenButton variant="contained" onClick={Addfetch}>
            Add
          </GreenButton>
          <RedButton variant="contained" onClick={() => closeModal(false)}>
            Cancel
          </RedButton>
        </Stack>
      </div>
    </div>
  );
};

export default categoryModal;
