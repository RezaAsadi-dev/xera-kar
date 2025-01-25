import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.css";
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
import Options from "./options/index";
import image1 from "assets/images/profile.jpg";
import TextEditor from "./components/TextEditore";
import SoftButton from "components/SoftButton/index";

function Category() {
  const dispatch1 = useDispatch();
  const categoryUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "cat", query: {}, page: currentPage }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          setData(res?.data);
          setnumber(res?.count);
          setTotalPages(res?.max_page);
        } else {
          dispatch1(handler(false));
          toast.error("Something went wrong!");
        }
      }
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("category")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
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
              <LengthNumber title=" Categories:" number={number?.toLocaleString()} />
              <SoftButton
                className="md:left-4 left-0 text-xs md:text-sm md:px-4 px-2 md:py-2 py-1 !ml-8"
                variant="outlined"
                color="mainColor"
                size="small"
                onClick={() => navigate("/category/addCat")}
              >
                Add Category
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
                      <th>Subcategory Count</th>
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
                            <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
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
                        <td>{item.weight ? item.weight : "-"}</td>
                        {/* <Button onPress={onOpen}> Add Sub </Button> */}

                        <td>{item.status ? "active" : "deactive"}</td>

                        <td>
                          <div className={`${style.userDetail} flex flex-col gap-2`}>
                            <Options
                              userId={item._id}
                              status={item.status}
                              openModal={setDeleteModal}
                              onClick={() => {
                                setUserId(item._id);
                                setUserStatus(item.status ? deactive : active);
                              }}
                              reFetch={fetchUsers}
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
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl" // Setting the size of the modal
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                      <ModalBody>
                        <TextEditor />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Action
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
    </DashboardLayout>
  );
}

export default Category;
