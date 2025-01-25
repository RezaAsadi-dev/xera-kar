/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GrSettingsOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import accessPage from "helper/functios";
import toast from "react-hot-toast";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { PiClockAfternoonBold } from "react-icons/pi";
import { SiNorton } from "react-icons/si";
import { TbXboxX } from "react-icons/tb";
import { fetchApi } from "api";
import { useDispatch } from "react-redux";
import {handler} from "../../../../redux/loaderSlice"
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

export default function Options({ userId, status }) {
  const updateUrl = "api/admin/update";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch1 = useDispatch();
  const open = Boolean(anchorEl);
  const openOption=(event)=>{
    setAnchorEl(event.currentTarget);
  }
  const handleClick = (event, type) => {
    // console.log(userId);
    submit(type);

    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const submit = (type) => {
    fetchApi(updateUrl, { collaction: "response", id: userId, workingStatus: type }, "put").then(
      (res) => {
        if (res?.status_code === 200) {
          console.log(res);     
          navigate(0)
            toast.success(" Request deactivated successfully! ");
          
        } else {
          dispatch1(handler(false));
          toast.error(" Something went wrong !");
        }
      }
    );
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={openOption}
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
            handleClick(e, "Assigned", status);
          }}
          disableRipple
        >
          <MdAssignmentTurnedIn className="mr-[12px]" />
          Assigned
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "pending", status);
          }}
          disableRipple
        >
          <PiClockAfternoonBold className="mr-[12px]" />
          Pending
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "Confirmed", status);
          }}
          disableRipple
        >
          <GiConfirmed className="mr-[12px]" />
          Confirmed
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "Accepted", status);
          }}
          disableRipple
        >
          <SiNorton className="mr-[12px]" />
          Accepted
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "Rejected", status);
          }}
          disableRipple
        >
          <TbXboxX className="mr-[12px]" />
          Rejected
        </MenuItem>
        {/* <MenuItem
          onClick={(e) => {
            handleClose();
            handleClick(e, "disable");
          }}
          disableRipple
        >
          <VscCompassActive className="mr-[12px]" />
          {status ? " Ativate " : " Deactivate "}
        </MenuItem> */}
      </StyledMenu>
    </>
  );
}
