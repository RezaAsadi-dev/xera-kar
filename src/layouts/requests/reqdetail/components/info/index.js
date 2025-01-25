import React, { useState } from "react";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import style from "./style.module.css";

import { useDisclosure } from "@nextui-org/react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "@nextui-org/react";
import Options from "../../options";

import { truncateString } from "helper/functios";

function Infos({ info }) {
 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const tableData = [1, 2, 3, 4, 5];
  return (
    <div className="h-screen ">
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
                  <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "20%",
                        transition: "transform 0.8s ease",
                      }}
                      src={info[0]?.projectImg}
                    />
                  </div>
                </td>
                <td>{info[0]?.title}</td>
                <td>{info[0]?.category}</td>
                <td>{info[0]?.subcategory}</td>
                <td>{info[0]?.date.slice(0, 10)}</td>
                <td>
                  <Button onPress={onOpen}> View </Button>
                </td>{" "}
                <td>{info[0]?.status ? "Active" : "Deavtive"}</td>
                <td>{info[0]?.dateTime.slice(0, 10)}</td>
              </tr>

              {/* {info.map((item, index) => {
               
              })} */}
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
                {info[0]?.userdata?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.country}</td>
                    <td>{truncateString(item?.address, 10)}</td>
                    <td>{item?.status ? "Active" : "Deavtive"}</td>
                    <td>{item?.dateTime.slice(0, 10)}</td>
                  </tr>
                ))}
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
                  {/* <th>Email Address</th> */}
                  <th>Amount</th>
                  <th>Description</th>
                  <th>DateTime</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {info[0]?.response?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.profile[0]?.name}</td>
                    {/* <td>test</td> */}
                    <td>{item?.amount}</td>
                    <td>{truncateString(item?.description, 10)}</td>
                    <td>{item?.dateTime.slice(0, 10)}</td>
                    <td>{item?.date}</td>
                    <td>{item?.workingStatus}</td>
                    <td>
                      <div className={`${style.userDetail} flex flex-col gap-2`}>
                        <Options userId={item?._id}  status={item?.workingStatus} />
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
                {info[0]?.description}
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
