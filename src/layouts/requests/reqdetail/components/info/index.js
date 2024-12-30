import React, { useState } from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@nextui-org/react";
import image1 from "assets/images/profile.jpg";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Modal,
} from "@nextui-org/react";
import Options from "../../options";

// function InfoItem({ label, value }) {
//   // Convert value to string if it's an object
//   const displayValue = typeof value === "object" && value !== null ? JSON.stringify(value) : value;

//   return (
//     <SoftBox display="flex" py={1} pr={2}>
//       <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
//         {label} :
//       </SoftTypography>
//       <SoftTypography
//         variant="button"
//         fontWeight="regular"
//         color="text"
//         sx={{ marginRight: "6px" }}
//       >
//         <SoftBox display="flex" ml={0.5}>
//           {displayValue}
//         </SoftBox>
//       </SoftTypography>
//     </SoftBox>
//   );
// }

function Infos({ info, title }) {
  const adviserId = info ? info[0]?.adviserid : "";
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const nfoItems = [
    { label: "ّFirst Name", value: "fName" },
    { label: "Last Name ", value: "lName" },
    { label: "phoneNumber ", value: "phoneNumber" },
    { label: "Email", value: "email" },
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

  const tableData = [1, 2, 3, 4, 5];
  return (
    <div className="h-screen ">
      {" "}
      <Card style={{ padding: "20px" }}>
        <div className=" flex justify-between py-4 ">
          <SoftTypography style={{ padding: "10px 0", fontSize: "16px", color: "#3f3f3f" }}>
            Request data
          </SoftTypography>
        </div>

        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <table className={style.ManagersTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title </th>
                <th>Category </th>
                <th>Subcategory </th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Status</th>
                <th>Datetime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {" "}
                  <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "20%",
                        transition: "transform 0.8s ease",
                      }}
                      src={image1}
                    />
                  </div>
                </td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>
                  <Button onPress={onOpen}> View </Button>
                </td>{" "}
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
        </SoftBox>
      </Card>
      <div className=" flex  justify-evenly mt-8 *:w-full space-x-20">
        <Card sx={{ overflowY: "auto" }}>
          <div className="p-4">
            <SoftTypography style={{ padding: "10px 0", fontSize: "16px", color: "#3f3f3f" }}>
              User Data
            </SoftTypography>{" "}
          </div>
          {/* <SoftTypography style={{padding:"20px "}}>
            CategoryDetails
          </SoftTypography> */}
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <table className={style.ManagersTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Country</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>DateTime</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              </tbody>
            </table>
          </SoftBox>
        </Card>
      </div>
      <div className=" flex  justify-evenly mt-8 *:w-full space-x-20">
        <Card sx={{ overflowY: "auto" }}>
          <div className="p-4">
            <SoftTypography style={{ padding: "10px 0", fontSize: "16px", color: "#3f3f3f" }}>
              Responses
            </SoftTypography>{" "}
          </div>
          {/* <SoftTypography style={{padding:"20px "}}>
            CategoryDetails
          </SoftTypography> */}
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <table className={style.ManagersTable}>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>DateTime</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>1</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>
                      <div className={`${style.userDetail} flex flex-col gap-2`}>
                        <Options userId={item?._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SoftBox>
        </Card>
      </div>
      <Modal
        classNames={{ backdrop: "z-[9999]", wrapper: "z-[9999]" }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Description</ModalHeader>
              <ModalBody style={{ overflowY: "auto", maxHeight: "500px", fontSize: 16 }}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </div>
  );
}

export default Infos;
