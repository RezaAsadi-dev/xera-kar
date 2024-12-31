import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { timelineContentClasses } from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import style from "./style.module.css";
// import { FaComments, FaUsersCog, FaUserTie } from "react-icons/fa";
// import {
//   FaUsers,
//   FaCodePullRequest,
//   FaSliders,
// } from "react-icons/fa6";
// import { RiUser2Fill, RiOrganizationChart, RiUserStarFill } from "react-icons/ri";
// import { MdNotificationsActive } from "react-icons/md";
// import { BiSolidCategoryAlt, BiSupport } from "react-icons/bi";
import { Divider } from "@nextui-org/react";
function ManagersCardInfo({ title, permissions }) {
  console.log(permissions);
  
  const allPermissions = [
    { name: "Dashboard",  access:true },
    { name: "Users",  access:true },
    { name: "Professionals",  access:true },
    { name: "Category",  access:true },
    { name: "Request ",  access:true },
    { name: "Comments",  access:true },
    { name: " Slider", access:true },
    { name: "Notifications", access:true },
    { name: "Support ", access:true},
  ];
  // const iconMapping = {
  //   Dashboard: <FaUserTie />,
  //   Users: <FaUsers />,
  //   Professionals : <FaUsersCog />,
  //   Category: <BiSolidCategoryAlt />,
  //   Request: <FaCodePullRequest />,
  //   Comments: <FaComments />,
  //   Slider: <FaSliders />,
  //   Notifications: <MdNotificationsActive />,
  //   Support: <BiSupport />,
  // };

  const renderPermissions = () => {
    return (
      <Timeline
        sx={{
          [`& .${timelineContentClasses.root}`]: {
            flex: 0.1,
          },
        }}
        position="left"
      >
        {permissions &&
          allPermissions.map((permission, index) => (
            <div className=" grid grid-cols-2" key={index}>
              <div className={style.titleContainer}>
                {[permission.name]} 
              </div>

              {["access"].map((action, subIndex) => (
                <TimelineItem key={`${index}-${subIndex}`}>
                  <TimelineOppositeContent
                    sx={{
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    {console.log(action)
                    }
                    {action === "access"
                      && "Access"
                     }
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot
                      style={{ padding: "1px" }}
                      color={permission[action] ? "success" : "error"}
                    >
                      {permission[action] ? (
                        <CheckIcon style={{ color: "#fff" }} />
                      ) : (
                        <CloseIcon style={{ color: "#fff" }} />
                      )}
                    </TimelineDot>
                    {/* {subIndex < 3 && <TimelineConnector />} */}
                  </TimelineSeparator>
                </TimelineItem>
              ))}
            </div>
          ))}
      </Timeline>
    );
  };
  const renderPermissionsFull = () => {
    return (
      <Timeline
        sx={{
          [`& .${timelineContentClasses.root}`]: {
            flex:0.1, 
          },
        }}
        position="left"
        
      >
        <div className= "flex flex-wrap">
        {allPermissions.map((permission, index) => (
          <div key={index} className="ml-[80px] mb-5">
            <div className={style.titleContainer}>
            <span className="text-lg">{permission.name}</span>
            </div>

            {["delete", "edit", "view", "add"].map((action, subIndex) => (
              <TimelineItem key={`${index}-${subIndex}`}>
                <TimelineOppositeContent
                  sx={{
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {action === "delete"
                    ? "Delete"
                    : action === "edit"
                    ? "Edit"
                    : action === "view"
                    ? "View"
                    : "Add"}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    style={{ padding: "1px" }}
                    color={permission[action] ? "success" : "error"}
                  >
                    {permission[action] ? (
                      <CheckIcon style={{ color: "#fff" }} />
                    ) : (
                      <CloseIcon style={{ color: "#fff" }} />
                    )}
                  </TimelineDot>
                  {subIndex < 3 && <TimelineConnector />}
                </TimelineSeparator>
              </TimelineItem>
            ))}
          </div>
        ))}
        </div>
      </Timeline>
    );
  };

  return (
    <Card sx={{ height: "60vh" }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
        
      >
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
       
      </SoftBox>
       <Divider className="my-3"/>
      <div className={style.accessContainer}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          {/* {permissions === "full" ? renderPermissionsFull() : renderPermissions()} */}
          {renderPermissions()}
        </SoftBox>
      </div>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ManagersCardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ManagersCardInfo;
