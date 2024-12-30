// Import necessary hooks and components from React and other libraries
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved14.jpg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import { fetchApi } from "api";
import { mainAddress } from "api";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAdmin = `${mainAddress}/v1/api/admin/auth/login`;
  const loginOperator = "v1/api/admin/auth/operatorlogin";
  const [value, setValue] = useState("1");
  const { pathname } = useLocation();
  const [showPass, setShowPass] = useState({
    pass: false,
    confirm: false,
  });

  const tokenss = localStorage.getItem("tokenSina");

  // State for admin and operator login data
  const [operatorData, setOperatorData] = useState({
    loginUser: "",
    loginPassword: "",
  });
  const [adminData, setAdminData] = useState({
    loginUser: "",
    loginPassword: "",
  });

  // Function to handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to handle input change based on login type (admin/operator)
  const changeHandler = (e, type) => {
    if (type === "admin") {
      setAdminData({
        ...adminData,
        [e.target.name]: e.target.value,
      });
    } else {
      setOperatorData({
        ...operatorData,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (tokenss) {
      navigate("/dashboard", { replace: true });
    }
  }, [tokenss, pathname]);

  // Function to handle login submission
  const loginHandler = (event) => {
    event.preventDefault();
    if (value === "1") {
      // Admin login validation
      if (adminData.loginPassword && adminData.loginUser) {
        dispatch(handler(true));
        axios
          .post(loginAdmin, {
            user: adminData.loginUser,
            password: adminData.loginPassword,
          })
          .then((res) => {
            if (res?.data?.status_code === 200) {
              localStorage.setItem("tokenSina", res?.data?.Token);
              localStorage.setItem("usernameSina", res?.data?.name);
              localStorage.setItem("accessSina", JSON.stringify(res?.data?.access));
              navigate("/dashboard", { replace: true });
              dispatch(handler(false));
            } else if (res?.data?.status_code === 401) {
              dispatch(handler(false));
              toast.error("Please check your username or password!");
            } else {
              dispatch(handler(false));
              toast.error("Something went wrong! please try again later");
            }
          });
      }
    } else {
      // Operator login validation
      if (operatorData.loginPassword && operatorData.loginUser) {
        dispatch(handler(true));
        axios
          .post(loginAdmin, {
            user: adminData.loginUser,
            password: adminData.loginPassword,
          })
          .then((res) => {
            if (res?.status_code === 200) {
              localStorage.setItem("tokenSina", res?.data?.Token);
              localStorage.setItem("usernameSina", res?.data?.name);
              localStorage.setItem("accessSina", JSON.stringify(res?.data?.access));
              navigate("/dashboard", { replace: true });
              dispatch(handler(false));
            } else if (res?.data?.status_code === 401) {
              dispatch(handler(false));
              toast.error(" Please check your username or password! ");
            } else {
              dispatch(handler(false));
              toast.error(" Something went wrong! please try again later ");
            }
          });
      }
    }
  };

  return (
    <>
      <CoverLayout style={{ background: "red" }} image={curved9}>
        <SoftBox component="form" role="form">
          <div>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box>
                  <TabList onChange={handleChange}>
                    <Tab label="Administrators" value="1" />
                    <Tab label="Management" value="2" />
                  </TabList>
                </Box>
                <Box sx={{ border: 1, borderColor: "divider", borderRadius: "10px", mt: "2px" }}>
                  <TabPanel value="1">
                    <>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            style={{ fontSize: 15 }}
                            variant="caption"
                            fontWeight="bold"
                          >
                            Email or Username
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="text"
                          placeholder="username "
                          name="loginUser"
                          value={adminData.loginUser}
                          onChange={(e) => changeHandler(e, "admin")}
                        />
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            style={{ fontSize: 15, display: "flex", alignItems: "center" }}
                            variant="caption"
                            fontWeight="bold"
                          >
                            Password
                        
                          </SoftTypography>
                        </SoftBox>
                        <div className=" relative "> 

                        <SoftInput
                          type={showPass.pass ? "text" : "password"}
                          placeholder="password "
                          name="loginPassword"
                          id="password"
                          value={adminData.loginPassword}
                          onChange={(e) => changeHandler(e, "admin")}
                        />
                            <button
                              className="absolute top-[10px] right-3 focus:outline-none ml-2"
                              type="button"
                              onClick={() => setShowPass({ ...showPass, pass: !showPass.pass })}
                              aria-label="toggle password visibility"
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              {showPass.pass ? (
                                <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                              ) : (
                                <IoEye className="text-xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                        </div>
                      </SoftBox>
                      <SoftBox mt={4} mb={1}>
                        <SoftButton
                          variant="gradient"
                          style={{ fontSize: 18 }}
                          color={adminData.loginPassword && adminData.loginUser ? "info" : "error"}
                          fullWidth
                          onClick={loginHandler}
                        >
                          Login
                        </SoftButton>
                      </SoftBox>
                    </>
                  </TabPanel>
                  <TabPanel value="2">
                    <>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            style={{ fontSize: 15 }}
                            variant="caption"
                            fontWeight="bold"
                          >
                            Username or Email
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="text"
                          placeholder="username "
                          name="loginUser"
                          value={operatorData.loginUser}
                          onChange={(e) => changeHandler(e, "operator")}
                        />
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography
                            component="label"
                            style={{ fontSize: 15 }}
                            variant="caption"
                            fontWeight="bold"
                          >
                            Password
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          type="password"
                          placeholder="password "
                          name="loginPassword"
                          id="password"
                          value={operatorData.loginPassword}
                          onChange={(e) => changeHandler(e, "operator")}
                        />
                      </SoftBox>
                      <SoftBox mt={4} mb={1}>
                        <SoftButton
                          variant="gradient"
                          style={{ fontSize: 18 }}
                          color={
                            operatorData.loginPassword && operatorData.loginUser ? "info" : "error"
                          }
                          fullWidth
                          onClick={
                            operatorData.loginPassword && operatorData.loginUser
                              ? loginHandler
                              : null
                          }
                        >
                          Login
                        </SoftButton>
                      </SoftBox>
                    </>
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </div>
        </SoftBox>
      </CoverLayout>
    </>
  );
}

export default SignIn;
