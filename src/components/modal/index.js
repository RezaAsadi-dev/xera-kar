import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import LogoutIcon from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "16px",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    width: 100,
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    width: 100,
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));
  const logOuthandler = () => {
    localStorage.removeItem("tokenSina");
    localStorage.removeItem("accessSina");
    localStorage.removeItem("usernameSina");
    // window.location.reload()
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <IconButton
        size="large"
        color="inherit"
        // sx={navbarIconButton}
        variant="contained"
        onClick={handleOpen}
      >
        <LogoutIcon />
      </IconButton>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Logout 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 17 }}>
          Do you want to log out ?
          </Typography>

          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={2}>
            <ColorButton2 variant="contained" onClick={logOuthandler}>
              Exit
            </ColorButton2>

            <ColorButton variant="contained" onClick={handleClose}>
              Cancel
            </ColorButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
