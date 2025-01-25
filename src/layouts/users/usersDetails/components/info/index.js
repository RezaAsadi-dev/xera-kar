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

function Infos({ info = [], title, requestDetails }) {

  const infoItems = [
    { label: "User Name", value: "name" },
    { label: "Phone Number", value: "phoneNumber" },
    { label: "Email address", value: "email" },
    // { label: "Gender", value: "gender" },
    { label: "Country", value: "country" },
    { label: "City", value: "city" },
    { label: "Address", value: "address" },
    { label: "Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
    { label: "Status", value: "status" ,
      fun: (status) => status ? "Active" : "Deactive"
    }
  ]
  return (
    <SoftBox className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-10">
      <Card sx={{ padding: 3, width: "100%", maxWidth: 800 }}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" mb={2}>
          {title}
        </SoftTypography>
        <SoftBox display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
          {info.map((item, index) => (
            <React.Fragment key={`info-item-${index}`}>
              {infoItems.map(({ label, value, fun }, idx) => (
                <InfoItem
                  key={`${label}-${idx}`}
                  label={label}
                  value={fun ? fun(item[value]) : item[value]}
                />
              ))}
            </React.Fragment>
          ))}
        </SoftBox>
      </Card>

      {requestDetails && (
        <Card sx={{ padding: 3, width: "100%", maxWidth: 800, marginLeft: 2 }}>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" mb={2}>
            Request Details
          </SoftTypography>
          <SoftBox display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            {requestDetails.map((item, index) => (
              <React.Fragment key={`request-info-item-${index}`}>
                {/* Add specific fields for request details here */}
                <InfoItem label="Request ID" value={item.request_id} />
                <InfoItem label="Request Status" value={item.status} />
                <InfoItem label="Request Date" value={item.request_date} />
                {/* Add more fields based on your request details */}
              </React.Fragment>
            ))}
          </SoftBox>
        </Card>
      )}
    </SoftBox>
  );
}

Infos.defaultProps = {
  info: [],
  requestDetail: [],
};

export default Infos;
