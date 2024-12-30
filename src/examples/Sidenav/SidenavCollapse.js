// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

import { useSoftUIController } from "context";
import SidenavSub from "./SidenavSub";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./style.module.css";

function SidenavCollapse({
  color,
  icon,
  name,
  data,
  mainRoute,
  active,
  isActive,
  type,
  noCollapse,
  open,
  openS,
  ...rest
}) {
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(2)[0];
  const navigate = useNavigate();

  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  // useEffect(() => {
  //   console.log("------------------------------------");
  //   console.log(pathname.split("/").slice(1)[0]);
  //   console.log(mainRoute);
  //   console.log("------------------------------------");
  //   // if (window.location.pathname === routes) {
  //   //   console.log(true);
  //   // }
  // }, [window.location]);

  return (
    <>
      <ListItem component="li">
        <SoftBox
          mt={8}
          {...rest}
          sx={(theme) => collapseItem(theme, { active, transparentSidenav })}
        >
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => collapseText(theme, { miniSidenav, transparentSidenav, active })}
          />

          {type === "sub" && (isActive ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />)}
        </SoftBox>
      </ListItem>
      {type === "sub" && isActive ? (
        // <Collapse in={open} unmountOnExit>
        <>
          <ul className={styles.sub}>
            {data.map((item, index) => (
              <>
                <li
                  key={index}
                  className={item.key === collapseName ? styles.activated : styles.notactive}
                >
                  <Link to={item.route}>{item.name}</Link>
                </li>
              </>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  mainRoute: PropTypes.any,
  children: PropTypes.node,
  active: PropTypes.bool,
  isActive: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
  data: PropTypes.any,
  openS: PropTypes.any,
  type: PropTypes.string,
};

export default SidenavCollapse;
