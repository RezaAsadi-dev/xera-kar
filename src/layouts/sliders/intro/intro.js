import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.scss";
import { fetchApi } from "api";
import CloseIcon from '@mui/icons-material/Close';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
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
import Options from '../intro/components/options'
import image1 from "assets/images/profile.jpg";
import SoftButton from "components/SoftButton/index";
import { Dialog, DialogContent, IconButton } from "@mui/material";

export default function Intro() {

  const dispatch1 = useDispatch();
  const introUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [exelloading, setExelLoading] = useState(false);
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState("")

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(introUrl, { collaction: "adv", query: { type: "intro" }, page: currentPage }, "post").then((res) => {
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
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("Intro")) {
      navigate("/inaccessibility");
    }
  }, []);
  const onclickHandlerModal = (item) => {
    setModalData(item?.Description)
    onOpen()
  }
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox mt={4}>
          <SoftBox mb={3}>
            <Card style={{ position: "relative" }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={4}
                style={{ left: "200px", top: "10px" }}
              >
                <LengthNumber title=" Intros:" number={number?.toLocaleString()} />
                <SoftButton
                  className="md:left-4 left-0 text-xs md:text-sm md:px-4 px-2 md:py-2 py-1 !ml-8"
                  variant="outlined"
                  color="mainColor"
                  size="small"
                  onClick={() => navigate("/slider/intro/addintro")}
                >
                  Add Intro
                </SoftButton>
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
                        <th>Image</th>
                        <th>Title </th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td>
                            {item.img ? (
                              <div onClick={() => handleImageClick(item.img || image1)} className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                                <img
                                  src={item.img}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "20%",
                                    transition: "transform 0.8s ease",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.5)")
                                  }
                                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                              </div>
                            ) : (
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
                            )}
                          </td>
                          <td>{item.title}</td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>
                            <Button onPress={() => onclickHandlerModal(item)}> View </Button>
                          </td>
                          <td>{item.status ? "active" : "deactive"}</td>

                          <td>
                            <div className={`${style.userDetail} flex flex-col gap-2`}>
                              <Options
                                userId={item._id}
                                status={item.status}
                                id={item._id}
                                openModal={setDeleteModal}
                                onClick={() => {
                                  setUserId(item._id);
                                  setUserStatus(item.status ? deactive : active);
                                }}
                                phoneNumber={item.phoneNumber}
                                fName={item.fName}
                                lName={item.lName}
                                refetch={fetchUsers}
                              />
                            </div>
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

      </DashboardLayout>
      <Modal classNames={{ backdrop: "z-[9999]", wrapper: "z-[9999]" }} isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Description</ModalHeader>
              <ModalBody style={{ overflowY: "auto", maxHeight: "500px", fontSize: 16 }}>
                <p>{modalData}</p>
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
      </Modal>
      <Dialog open={isImageModalOpen} onClose={closeImageModal} maxWidth="md">
        <DialogContent>
          <IconButton onClick={() => closeImageModal(false)}>
            <CloseIcon />
          </IconButton>
          <img
            // className="h-[200]"
            src={selectedImage}
            alt="Expanded View"
            style={{
              max_width: "500px",
              max_height: "500px",
              borderRadius: "10px",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
