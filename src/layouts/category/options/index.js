/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { GrSettingsOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import accessPage from "helper/functios";
import toast from "react-hot-toast";
import { VscCompassActive } from "react-icons/vsc";
import { FiInfo } from "react-icons/fi";
import { fetchApi } from "api";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    maxWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function Options({ reFetch, userId, status }) {
  const url = "api/admin/update";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event, type, id) => {
    setAnchorEl(event.currentTarget);
    if (type === "detail") {
      setAnchorEl(null);
      navigate(`/category/categoryDetails/${id}`);
    } else if (type === "edit") {
      setAnchorEl(null);
      navigate(`/category/editCategory/${id}`);
    } else if (type === "disable") {
      setAnchorEl(null);
      submit();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openHandler = (type) => {
    if (accessPage(" category ", type)) {
      toast.error(" inaccesibility ");
      handleClose();
      return false;
    } else return true;
  };
  const submit = () => {
    fetchApi(url, { collaction: "cat", id: userId, status: !status }, "put").then((res) => {
      if (res?.status_code === 200) {
        if (status) {
          toast.success(" Category deactivated successfully! ");
        } else {
          toast.success(" Category activated successfully! ");
        }

        reFetch();
      } else {
        toast.error(" Something went wrong !");
      }
    });
  };
  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
      >
        <GrSettingsOption size={20} color="rgb(66, 73, 85)" />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "detail", userId);
          }}
          disableRipple
        >
          <FiInfo className="mr-[12px]" />
          Detail
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "edit", userId);
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "disable");
          }}
          disableRipple
        >
          <VscCompassActive className="mr-[12px]" />
          {status ? " Deativate " : " Activate "}
        </MenuItem>
      </StyledMenu>
    </>
  );
}
