import React, { useState } from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import countries  from "../../../../assets/countries/countries.json";
import { Textarea } from "@nextui-org/react";

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

  
  const findCountryName = (id) => {
    const country = countries.find((country) => country.id === id);
    return country ? country.name : "Unknown";
  }; 

  const infoItems = [
    { label: " Company Name", value: "coName" },
    { label: "Company Phone Number", value: "coPhoneNumber" },
    { label: "Country", value: "country" , fun: findCountryName },
    { label: "Company Address", value: "coAddress" },
    { label: "Address ", value: "phoneNumber" },
    { label: "Services & Products", value: "service_product" },
    { label: "Type", value: "type" },
    { label: "Category ", value: "category" },
    { label: "Years of experience", value: "yearOfExperience" },
    { label: "Company Website", value: "coWebsite" },
    { label: "About Company", value: "coAbout", },
    { label: " Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
    { label: "Status", value: "status" },
  ];
const mediaItems = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'First Image'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Second Image'
    },
    {
      type: 'video',
      url: 'https://www.w3schools.com/html/movie.mp4',
      caption: 'Sample Video'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Third Image'
    },
  ];   
  const [selectedMedia, setSelectedMedia] = useState(mediaItems[0]);
  return (
    <div className="grid md:grid-cols-2  grid-cols-1 mt-8 gap-10 ">
      <Card sx={{ padding: 3, width: "100%", maxWidth: 800 }}>
      <div className=" flex flex-col md:w-full w-full sm:justify-start justify-center lg:pr-8  mt-4 ">
            <Textarea
              variant="bordered"
              label="About Company"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="text-gray-700  "
            />
          </div>
        <div className=" pt-4" style={{ overflowY: "auto" }}>
          <SoftBox display="flex" justifyContent="start" p={2}>
            {info.map((item, index) => (
              <SoftBox key={index}>
                {infoItems?.map(({ label, value, fun }) => (
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
      <Card sx={{ position: "relative", overflowY: "auto", height: "100%" }}>
              {/* Main Media Display */}
              <div className="main-media-display" style={{ textAlign: "center", marginBottom: "20px" }}>
                {selectedMedia.type === 'image' ? (
                  <img
                    style={{ width: "100%", maxWidth: "800px", height: "auto" }}
                    src={selectedMedia.url}
                    alt="Selected"
                  />
                ) : (
                  <video
                    style={{ width: "100%", maxWidth: "800px", height: "auto" }}
                    controls
                  >
                    <source src={selectedMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
      
              {/* Horizontal Slider */}
              <div className="slide-container" style={{ display: "flex", overflowX: "scroll", paddingBottom: "10px", paddingRight: "5px" }}>
                {mediaItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "5px 10px",
                      cursor: "pointer",
                      opacity: selectedMedia.url === item.url ? 1 : 0.6, // Highlight selected media
                      transition: "opacity 0.3s",
                    }}
                    onClick={() => setSelectedMedia(item)} // Update selected media
                  >
                    {item.type === 'image' ? (
                      <img
                        style={{
                          width: "120px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        src={item.url}
                        alt={`thumbnail-${index}`}
                      />
                    ) : (
                      <video
                        style={{
                          width: "120px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        muted
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </Card>
    </div>
  );
}

export default Infos;

