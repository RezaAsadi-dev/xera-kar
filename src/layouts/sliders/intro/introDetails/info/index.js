import React from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// import { Provinces } from "../../data/provinces";
import { Divider, Link } from "@nextui-org/react";
import { FiExternalLink } from "react-icons/fi";

function InfoItem({ label, value }) {
  // Convert value to string if it's an object
  const displayValue = typeof value === "object" && value !== null ? JSON.stringify(value) : value;

  return (
    <SoftBox display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label} :
      </SoftTypography>
      <SoftTypography
        variant="button"
        fontWeight="regular"
        color="text"
        sx={{ marginRight: "6px" }}
      >
        <SoftBox display="flex" ml={0.5}>
          {displayValue}
        </SoftBox>
      </SoftTypography>
    </SoftBox>
  );
}

function Infos({ info, title }) {
  const adviserId = info ? info[0]?.adviserid : ""; 
  const agentId = info ? info[0]?.agentid : ""; 
  
  // const findProvinces = (id) => {
  //   const province = Provinces.find((province) => province.id === id);
  //   return province && province.name;
  // };

  const infoItems = [
    { label: "ّFirst Name", value: "fName" },
    { label: "Last Name ", value: "lName" },
    { label: "phoneNumber ", value: "phoneNumber" },
    { label: "Email", value: "email" },
    // { label: "Province", value: "province", fun: findProvinces },
    { label: " birthday", value: "birthday" },
    { label: "BloodType ", value: "bloodType" },
    { label: "Gender", value: "gender" },
    { label: "Weight", value: "weight" },
    { label: "Height", value: "height" },
    { label: " Martial Status ", value: "martialStatus" },
    { label: "Job Major", value: "jobMajor" },
    { label: "Certificate ", value: "certificate" },
    { label: " Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
  ];

  return (
    <div className="h-screen ">
    {" "}
    <Card style={{ padding: "20px" }}>
      <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        <span>{title}</span>
      </SoftTypography>
    </Card>
    <div className=" flex  justify-evenly mt-8 *:w-full space-x-20">
      <Card sx={{ overflowY: "auto" }}>
        <div className=" pt-4" style={{ overflowY: "auto" }}>
          <SoftBox display="flex" justifyContent="start" p={2}>
            {info.map((item, index) => (
              <SoftBox key={index}>
                {infoItems?.slice(0, 7)?.map(({ label, value, fun }) => (
                  <InfoItem
                    key={label}
                    label={label}
                    value={fun ? fun(item[value]) : item[value]}
                  />
                ))}
              </SoftBox>
            ))}
            {/* {info.map((item, index) => (
            <SoftBox key={index}>
              {infoItems?.slice(7, 15)?.map(({ label, value, fun }) => (
                <InfoItem
                  key={label}
                  label={label}
                  value={fun ? fun(item[value]) : item[value]}
                />
              ))}
            </SoftBox>
          ))} */}
          </SoftBox>
        </div>
      </Card>
      <Card sx={{ overflowY: "auto" }}>
        <div className=" pt-4" style={{ overflowY: "auto" }}>
          <SoftBox display="flex" justifyContent="start" p={2}>
            {/* {info.map((item, index) => (
            <SoftBox key={index}>
              {infoItems?.slice(0, 7)?.map(({ label, value, fun }) => (
                <InfoItem
                  key={label}
                  label={label}
                  value={fun ? fun(item[value]) : item[value]}
                />
              ))}
            </SoftBox>
          ))} */}
            {info.map((item, index) => (
              <SoftBox key={index}>
                {infoItems?.slice(7, 15)?.map(({ label, value, fun }) => (
                  <InfoItem
                    key={label}
                    label={label}
                    value={fun ? fun(item[value]) : item[value]}
                  />
                ))}
              </SoftBox>
            ))}
          </SoftBox>
        </div>
      </Card>
    </div>
  </div>
  );
}

export default Infos;

