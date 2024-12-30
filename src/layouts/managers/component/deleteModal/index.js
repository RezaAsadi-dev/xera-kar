import React from "react";
import { IoClose } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { handler } from "../../../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import style from "./DeleteModal.module.css";

const DeleteModal = ({ closeModal, id, fetchData }) => {
  const dispatch = useDispatch();
  const deleteUrl = "v1/api/admin/operator/deleate";

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

  const handleDelete = async () => {
    dispatch(handler(true));
    const res = await fetchApi(deleteUrl, { id }, "post");
    dispatch(handler(false));
    if (res?.status_code === 200) {
      fetchData();
      closeModal(false);
      toast.success(" Manager has been deleted successfully!");
    } else {
      closeModal(false);
      toast.error(" Something went wrong!");
    }
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
          <h3 className={style.headerText}> Delete Manager </h3>
        </div>
        <div className={style.deleteTitle}>
          <h1>
            Do you want to delete?
          </h1>
        </div>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <GreenButton variant="contained" onClick={handleDelete}>
            Delete
          </GreenButton>
          <RedButton variant="contained" onClick={() => closeModal(false)}>
            Cancel
          </RedButton>
        </Stack>
      </div>
    </div>
  );
};

export default DeleteModal;
