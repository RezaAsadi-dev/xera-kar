import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { handler } from "../../../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import style from "./editModal.module.scss";
import { Checkbox, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const EditModal = ({ closeModal, id, fetchData, info }) => {
  const dispatch = useDispatch();
  const updateurl = "v1/api/admin/auth/update_profile";
  const [passwordVisibility, setPasswordVisibility] = useState({
    new_password: false,
    confirm_new_password: false,
  });
  const [editedData, setEditedData] = useState({ ...info });
  const [checkBox, setCheckBox] = useState(false);

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const inputs = [
    { label: "User Name", name: "user", type: "text" },
    { label: "Name", name: "name", type: "text" },
    { label: "Phone Number ", name: "phone", type: "number" },
    { label: "New password ", name: "new_password", type: "password" },
    { label: "Confirm new password", name: "confirm_new_password", type: "password" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    let dataToSend = { ...editedData };

    if (checkBox) {
      const { new_password, confirm_new_password } = editedData;

      if (!password || !new_password || !confirm_new_password) {
        toast.error("Please fill out all password fields!");
        return;
      }

      if (new_password !== confirm_new_password) {
        toast.error("The new password confirmation does not match the new password!");
        return;
      }

      dataToSend = {
        ...dataToSend,
        new_password,
      };
    } else {
      delete dataToSend.new_password;
      delete dataToSend.confirm_new_password;
    }

    // API call and other logic remain the same...
    dispatch(handler(true));
    fetchApi(updateurl, dataToSend, "post").then((res) => {
      if (res.status_code === 200) {
        closeModal(false);
        fetchData();
        setTimeout(() => {
          toast.success("The user was successfully edited.");
        }, 1000);
      } else {
        dispatch(handler(false));
        closeModal(false);
        toast.error(" Something went wrong");
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

  const renderInput = (input, index) => {
    const isPasswordField = input.name === "new_password" || input.name === "confirm_new_password";

    if (isPasswordField && !checkBox) return null;

    return (
      <div className="relative w-[30%]" key={index}>
        <Input
          type={isPasswordField && passwordVisibility[input.name] ? "text" : input.type}
          name={input.name}
          value={editedData?.[input.name] || ""}
          onChange={handleChange}
          variant="faded"
          isInvalid={
            input.name === "confirm_new_password" &&
            checkBox &&
            editedData.new_password !== editedData.confirm_new_password
          }
          errorMessage={
            input.name === "confirm_new_password" &&
            checkBox &&
            editedData.new_password !== editedData.confirm_new_password
              ? "Password confirmation does not match."
              : undefined
          }
          label={input.label}
          labelPlacement="outside"
        />
        {isPasswordField && (
        <button
          type="button"
          onClick={() => togglePasswordVisibility(input.name)}
          className="absolute right-3 mt-[10px] top-[50%] transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
        >
          {passwordVisibility[input.name] ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </button>
      )}
      </div>
    );
  };

  return (
    <div
      className={style.modal}
      onClick={() => {
        closeModal(false);
      }}
    >
      <div className={style.formContainer} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <span
            onClick={() => {
              closeModal(false);
            }}
            className={style.closeIcon}
          >
            <IoClose size={20} />
          </span>
          <h3 className={style.headerText}> Edit Info </h3>
        </div>
        <div className="w-full flex flex-wrap flex-row gap-3 justify-start ml-[18px]">
          {inputs.map((input, index) => renderInput(input, index))}
          <div className="flex justify-start w-full  text-[12px]">
            <Checkbox onChange={() => setCheckBox(!checkBox)}> Change password </Checkbox>
          </div>
        </div>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <GreenButton variant="contained" onClick={handleEdit}>
            Edit
          </GreenButton>
          <RedButton variant="contained" onClick={() => closeModal(false)}>
            Cancel
          </RedButton>
        </Stack>
      </div>
    </div>
  );
};

export default EditModal;
