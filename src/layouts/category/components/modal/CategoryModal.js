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
import style from "./categoryModal.module.scss"
import { Checkbox, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";
import SoftTypography from "components/SoftTypography";

const categoryModal = ({ closeModal, id, fetchData, info }) => {
  const dispatch = useDispatch();
  //   const updateurl = "v1/api/admin/auth/update_profile";

  const [editedData, setEditedData] = useState({ ...info });
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});

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

  const selectChange = (e) => {
    console.log(e.target.value);
    
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
        <div className=" flex justify-center"> <SoftTypography>Add Subcategory</SoftTypography></div>

        <form className={`${style.contantAddForm}  justify-center gap-4`}>
          <div className=" w-full gap-4 mb-10">
            <div className=" flex justify-center items-center gap-5 w-[80%] m-auto">


              <div className={`${style.formItem} w-full`}>
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
                  label=" Title  "
                  isInvalid={errors.username && focus.username}
                />
              </div>

              <div className={`${style.formItem} w-full`}>
                <Select
                  color="light"
                  name="status"
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
                    <SelectItem key={item} >
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex !justify-center !items-center !w-[80%] mt-[25px] m-auto">
              <Textarea
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your description..."
                className="text-gray-700"
              />
            </div>
          </div>
          <div className={`flex justify-center mt-10 w-full `}>
            <FileUploader />
          </div>
        </form>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <GreenButton variant="contained"
          //    onClick={handleEdit}
          >
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
