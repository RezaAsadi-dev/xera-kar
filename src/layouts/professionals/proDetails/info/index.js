import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import countries from "../data/countries.json";
import "react-slideshow-image/dist/styles.css";
import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import handler from "../../../../redux/loaderSlice";
import { Link, useParams } from "react-router-dom";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
const professionalUrl = "api/admin/fetch_one";
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
    { label: "Name", value: "name" },

    { label: "Phone Number ", value: "phoneNumber" },
    { label: "Email Address", value: "email" },
    { label: "Country", value: "country" },
    { label: "City", value: "city" },
    { label: "Address ", value: "address" },
    { label: "Category", value: "category" },
    { label: "Sub Category", value: "subcategory" },
    { label: "Year of Experience", value: "yearofExperience" },
    { label: "Status", value: "status" },
    { label: "Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
  ];

  // const mediaItems = [
  //
  //   {
  //     type: 'image',
  //     url: info[0]?.portfolioImgs,
  //     caption: 'Second Image'
  //   },
  //   {
  //     type: 'video',
  //     url: info[0]?.portfolioVideo,
  //     caption: 'Sample Video'
  //   },

  // ];
  const mediaItems = info[0]?.portfolioImgs || [];
  const portfolioVideo = info[0]?.portfolioVideo || "";

  const [selectedMedia, setSelectedMedia] = useState();
  useEffect(() => {
    if (mediaItems.length > 0) {
      setSelectedMedia(mediaItems[0]);
    }
  }, [mediaItems]);
  return (
    <div className="grid lg:grid-cols-3  grid-cols-1 mt-8 gap-10">
      <Card sx={{ padding: 3, width: "100%", maxWidth: 800 }}>
        <div className=" flex flex-col md:w-full w-full sm:justify-start lg:pr-8 mt-4">
          <div className=" ">
            <div className="  shadow rounded  space-y-4 ">
              <div className="flex gap-3 px-4 py-2">
                <div className="flex flex-col">
                  <p className="text-base  font-bold ">About Professional</p>
                </div>
              </div>
              <Divider />
              <div className="px-4 py-2">
                <p className=" text-sm "> {info[0]?.about}</p>
              </div>
            </div>
          </div>

          {/* <Textarea
            variant="bordered"
            label="About Professional"
            labelPlacement="outside"
            value={info?.about}
            placeholder="Enter your description"
            className="text-gray-700  "
          /> */}
        </div>
        <div className=" pt-4" style={{ overflowY: "auto" }}>
          <SoftBox display="flex" justifyContent="start" p={2}>
            {info?.map((item, index) => (
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

      {mediaItems && (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            overflowY: "auto",
            height: "100%",
          }}
        >
          {/* Main Media Display */}
          <div
            className="main-media-display w-full  "
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <div className="flex justify-center items-center">
              {selectedMedia ? (
                <img
                  className="object-cover rounded"
                  style={{ width: "auto", maxHeight: "500px" }}
                  src={selectedMedia}
                  alt="Selected Media"
                />
              ) : (
                <div className="flex justify-center items-center h-[500px]">
                  <IoImageOutline className=" text-9xl" />
                </div>
              )}
            </div>

            {/* {selectedMedia.type === 'image' ? (
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
          )} */}
          </div>

          {/* Horizontal Slider */}
          <div
            className="slide-container w-full"
            style={{
              display: "flex",
              overflowX: "auto",
              paddingBottom: "10px",
              paddingRight: "5px",
            }}
          >
            {mediaItems?.map((item, index) => (
              <div
                key={index}
                style={{
                  margin: "5px 10px",
                  cursor: "pointer",
                  opacity: selectedMedia === item ? 1 : 0.6, // Highlight selected media
                  transition: "opacity 0.3s",
                }}
                onClick={() => setSelectedMedia(item)} // Update selected media
              >
                <img
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={item}
                  alt={`thumbnail-${index}`}
                />

                {/* {item.type === 'image' ? (
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
              )} */}
              </div>
            ))}
          </div>
        </Card>
      )}
      <Card>
        {portfolioVideo ? (
          <div>
            <video style={{ width: "100%", maxWidth: "800px", height: "auto" }} controls>
              <source src={portfolioVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[500px]">
            <IoImageOutline className=" text-9xl" />
          </div>
        )}
      </Card>
    </div>
  );
}

export default Infos;
