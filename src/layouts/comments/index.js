import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.scss";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Modal,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import accessPage from "helper/functios";
import Lotties from "layouts/noData/Lotties";
import LengthNumber from "components/lengthNumber";

function Comments() {
  const dispatch1 = useDispatch();
  const userurl = "v1/api/admin/user/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (data.length) {
      setStatusData(data.map((item) => ({ ...item, status: item.status || false })));
    }
  }, [data]);

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(userurl, { page: currentPage }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.data);
        setnumber(res?.count);
        setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  const toggleStatus = (idx) => {
    const updatedStatus = statusData.map((item, index) =>
      idx === index ? { ...item, status: !item.status } : item
    );
    setStatusData(updatedStatus);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className=" mt-4">
        <SoftBox>
          <SoftBox mb={3}>
            <Card style={{ position: "relative" }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={4}
                style={{ left: "200px", top: "10px" }}
              >
                <LengthNumber title=" Comments:" number={number?.toLocaleString()} />
              </SoftBox>
              <SoftBox
              overflow="auto"
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                {data ? (
                  <table className={style.ManagersTable}>
                    <thead>
                      <tr>
                        <th>Row</th>
                        <th>Professionals</th>
                        <th>User</th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusData?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td>{item.lName}</td>
                          <td>{item.lName}</td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>
                            <Button onPress={onOpen}> View detail </Button>
                          </td>
                          <td>★★★★★</td>
                          <td>
                            <button
                              onClick={() => toggleStatus(index)}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out
      ${
        item.status
          ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500"
          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500"
      }
      focus:outline-none focus:ring-2 focus:ring-offset-2`}
                            >
                              {item.status ? "Active" : "Inactive"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Lotties />
                )}
              </SoftBox>
              <SoftBox
                display="flex"
                flexDirection=""
                justifyContent="center"
                alignItems="center"
                p={3}
              >
                {data && totalPages !== 1 && (
                  <Pagination
                    showControls
                    page={currentPage}
                    total={totalPages}
                    initialPage={1}
                    onChange={handlePageChange}
                  />
                )}
           <Modal classNames={{ backdrop: "z-[9999]", wrapper: "z-[9999]" }} isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Description</ModalHeader>
              <ModalBody style={{overflowY:"auto" ,maxHeight:"500px",fontSize:16}}>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
          
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
              </SoftBox>
            </Card>
          </SoftBox>
          <Card className="mt-[15px] p-[15px]">
            <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
              <span>
                © All rights of this site belong to XeraKar company. Any copying is prosecuted.
              </span>
            </div>
          </Card>
        </SoftBox>
      </div>
    </DashboardLayout>
  );
}

export default Comments;
