import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Lottie from "react-lottie-player";
import profile from "../../../../lottie/profile.json";
import { Divider } from "@nextui-org/react";

function ProfileInfoCard({ title, info }) {
  return (
    <Card sx={{ height: "60vh" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <Divider className="my-3" />
      <SoftBox p={2}>
        <SoftBox display="flex" py={1} pr={2}>
          <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
            User name  :
          </SoftTypography>
          <SoftTypography variant="button" pl={1} fontWeight="regular" color="text">
            {info?.user}
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" py={1} pr={2}>
          <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Firstname & Lastname  :
          </SoftTypography>
          <SoftTypography variant="button" pl={1} fontWeight="regular" color="text">
            {info?.name}
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" py={1} pr={2}>
          <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
            Phone number  :
          </SoftTypography>
          <SoftTypography variant="button" pl={1} fontWeight="regular" color="text">
            {info?.phone}
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox p={2}>
        <Lottie animationData={profile} play loop={true} />
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default ProfileInfoCard;
