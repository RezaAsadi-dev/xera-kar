import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import style from "./style.module.css";
import { LiaUserEditSolid } from "react-icons/lia";
import accessPage from "helper/functios";
import toast from "react-hot-toast";
import { Button, Link } from "@nextui-org/react";
import { RiUser2Fill, RiUserStarFill } from "react-icons/ri";

function Header({ info, modal, allModal }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleOpenModal = (type) => {
    if (accessPage("users", "edit")) {
      toast.error(" inaccessibility ");
    } else {
      if (type === "edit") {
        modal({ ...allModal, edit: true });
      } else if (type === "chooseRepresentative") {
        modal({ ...allModal, chooseRepresentative: true });
      } else {
        modal({ ...allModal, chooseConsultant: true });
      }
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute />
      <SoftBox
        position="relative"
        minHeight="15.5rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -9,
          mx: 3,
          py: 1.2,
          px: 2,
        }}
      >
        <Grid container alignItems="center" flexWrap="nowrap" justifyContent="space-around">
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              {info?.map((item, index) => (
                <SoftAvatar
                  key={index}
                  src={item?.profilePic}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />
              ))}
            </Grid>
            <Grid item>
              {info?.map((item, index) => (
                <SoftBox key={index} height="100%" mt={0.5} lineHeight={1}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    {`
                  ${item?.fName}
                  ${item?.lName}
                  `}
                  </SoftTypography>
                  <SoftTypography variant="button" color="text" fontWeight="medium">
                    {item?.phoneNumber}
                  </SoftTypography>
                </SoftBox>
              ))}
            </Grid>
          </Grid>
          <div className="flex justify-between flex-col lg:flex-row">
            <SoftBox className="mx-1">
                <Button color="primary" className="text-[13px] h-[36px] w-[130px] mb-1" variant="ghost"  onClick={() => handleOpenModal("edit")}>
                Edit <LiaUserEditSolid size={17} />
              </Button>
            </SoftBox>
          </div>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
