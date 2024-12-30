

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import routes from "routes";
import { useEffect, useState } from "react";

function Breadcrumbs({ icon, title, route, light }) {
  const routess = route.slice(0, -1);
  const [rou, setRou] = useState({});
  const [tit, setTit] = useState({});
  const [show, setshow] = useState(false);

  const routeHandler = () => {
    routes.map((item) => {
      if (item.key === title) {
        setTit(item);
      }
      if (item.key === routess[0]) {
        if (item.type === "sub") {
          item.sub.map((item) => {
            if (item.key === title) {
              setTit(item);
            }
          });
        }
        setRou(item);
        setshow(true);
      }
    });
  };

  useEffect(() => {
    routeHandler();
  }, []);
  return (
    <SoftBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <SoftTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </SoftTypography>
        </Link>

        {show && (
          <Link to={`${rou.route}`} key={rou}>
            <SoftTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {rou.name}
            </SoftTypography>
          </Link>
        )}

        {/* {rou.map((el) => (
          <Link to={`/${el}`} key={el}>
            <SoftTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </SoftTypography>
          </Link>
        ))} */}
        <SoftTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {tit.name}
        </SoftTypography>
      </MuiBreadcrumbs>
      {/* <SoftTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {tit.name}{" "}
      </SoftTypography> */}
    </SoftBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  light: PropTypes.bool,
};

export default Breadcrumbs;
