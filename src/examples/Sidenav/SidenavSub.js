// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

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
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
function SidenavSub({ data, color, active, ...rest }) {
  const navigate = useNavigate();
  const [controller] = useSoftUIController();

  return (
    <>
      <ul className={styles.sub}>
        <li
          className={active ? styles.activated : styles.notactive }
          onClick={() => navigate(data.route)}
        >
          {data.name}
        </li>
      </ul>
      {/* <ListItem component="li">
        <SoftBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
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
        </SoftBox>
      </ListItem>
    
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )} */}
    </>
  );
}

// Setting default values for the props of SidenavSub
SidenavSub.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavSub
SidenavSub.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
  data: PropTypes.any,
};

export default SidenavSub;
