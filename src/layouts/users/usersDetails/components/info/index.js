import React from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import countries from "../../data/countries.json";

function InfoItem({ label, value }) {
  const displayValue = typeof value === "object" && value !== null ? JSON.stringify(value) : value;

  return (
    <SoftBox display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize" sx={{ mr: 1 }}>
        {label}:
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        {displayValue}
      </SoftTypography>
    </SoftBox>
  );
}

function Infos({ info, title }) {
  const findCountryName = (id) => {
    const country = countries.find((country) => country.id === id);
    return country ? country.name : "Unknown";
  };

  const infoItems = [
    { label: "User Name", value: "name" },
    { label: "First Name", value: "name" },
    { label: "Last Name", value: "name" },
    { label: "Email address", value: "email" },
    { label: "Phone Number", value: "phoneNumber" },
    { label: "Gender", value: "gender" },
    { label: "Country", value: "country", fun: findCountryName },
    { label: "Address", value: "address" },
    { label: "Status", value: "status" },
    { label: "Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
  ];

  return (
    <SoftBox
      className="grid md:grid-cols-2  grid-cols-1 mt-8 gap-10  "
    >
      <Card sx={{ padding: 3, width: "100%", maxWidth: 800 }}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" mb={2}>
          {title}
        </SoftTypography>
        <SoftBox display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
          {info.map((item, index) => (
            <React.Fragment key={index}>
              {infoItems?.slice(0, 7).map(({ label, value, fun }) => (
                <InfoItem
                  key={label}
                  label={label}
                  value={fun ? fun(item[value]) : item[value]}
                />
              ))}
            </React.Fragment>
          ))}
        </SoftBox>
      </Card>
      <Card sx={{ overflowY: "auto"  }}>
        <div className=" pt-4" style={{ overflowY: "auto" }}>
          <SoftBox display="flex" justifyContent="start" p={2}>
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
    </SoftBox>
  );
}

export default Infos;
