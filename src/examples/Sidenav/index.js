import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

import { useSoftUIController, setMiniSidenav } from "context";

import SidenavSub from "./SidenavSub";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const [activeSidebar, setActiveSidebar] = useState();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  console.log(collapseName)

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, href, show, sub }, index) => {
      let returnValue;
      if (show) {
        if (type === "collapse") {
          returnValue = href ? (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                color={color}
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
                style={{ fontF }}
              />
            </Link>
          ) : (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                color={color}
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
                onClick={() => {
                  if (activeSidebar === index) {
                    setActiveSidebar();
                  } else {
                    setActiveSidebar(index);
                  }
                }}
              />
            </NavLink>
          );
        } else if (type === "sub") {
          returnValue = (
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              mainRoute={route}
              active={key === collapseName}
              isActive={index === activeSidebar}
              noCollapse={noCollapse}
              data={sub}
              type="sub"
              onClick={() => {
                if (activeSidebar === index) {
                  setActiveSidebar();
                } else {
                  setActiveSidebar(index);
                }
              }}
            />
          );
        } else if (type === "title") {
          returnValue = (
            <SoftTypography
              key={key}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              opacity={0.6}
              pl={3}
              mt={2}
              mb={1}
              ml={1}
            >
              {title}
            </SoftTypography>
          );
        } else if (type === "divider") {
          returnValue = <Divider key={key} />;
        }
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <SoftBox
              component="img"
              src={brand}
              alt=" Logo"
              width="3rem"
              style={{ marginLeft: "10px" }}
            />
          )}
          <SoftBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
      <hr className="MuiDivider-root MuiDivider-fullWidth ltr-1pcem6n-MuiDivider-root !mt-[90px]"></hr>
      <div className=" flex justify-center items-center text-gray-400 mb-[15px]">
        <span className="text-xs">
          Designed and developed by
          <a
            href="https://platinco.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 ml-1 transition-colors duration-200"
          >
            platinco.ir
          </a>
        </span>
      </div>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
