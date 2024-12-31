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
import { handler } from "../../../redux/loaderSlice";
import { Pagination } from "@nextui-org/react";
import accessPage from "helper/functios";
import Lotties from "layouts/noData/Lotties";
import LengthNumber from "components/lengthNumber";
import Options from "../components/options";
import image1 from "assets/images/profile.jpg";
import SoftButton from "components/SoftButton/index";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Advisement() {
  const dispatch1 = useDispatch();
  const userurl = "v1/api/admin/user/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state for modal image
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(userurl, { page: currentPage }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));

        // Add status to each item in the data
        const updatedData = res?.data.map((item) => ({
          ...item,
          status: item.status || false,
        }));

        setData(updatedData);
        setnumber(res?.count);
        setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
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
    if (accessPage("Advisement")) {
      navigate("/inaccessibility");
    }
  }, []);

  const toggleStatus = (index) => {
    setData((prevData) =>
      prevData.map((item, idx) => (idx === index ? { ...item, status: !item.status } : item))
    );
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

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
              <LengthNumber title=" Advisements:" number={number?.toLocaleString()} />
              <SoftButton
                className="md:left-4 left-0 text-xs md:text-sm md:px-4 px-2 md:py-2 py-1 !ml-8"
                variant="outlined"
                color="mainColor"
                size="small"
                onClick={() => navigate("/slider/advisement/addadvisement")}
              >
                Add Advisement
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
              {data?.data?.length !== 0 ? (
                <table className={style.ManagersTable}>
                  <thead>
                    <tr>
                      <th>Row</th>
                      <th>Image</th>
                      <th>Title </th>
                      <th>Link</th>
                      <th> DateTime </th>
                      <th> Status </th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 12 + index + 1}</td>
                        <td>
                          <div
                            className={`${style.userDetail} flex flex-col gap-2 items-center`}
                            style={{ cursor: "pointer" }}
                          >
                            {item.profilePic ? (
                              <img
                                onClick={() => handleImageClick(item.profilePic)}
                                src={item.profilePic}
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
                            ) : (
                              <img
                                src={image1}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "20%",
                                }}
                              />
                            )}
                          </div>
                        </td>

                        <td>{item.lName}</td>
                        <td>{item.email}</td>
                        <td>{item.dateTime.slice(0, 10)}</td>
                        <td>
                          <button
                            onClick={() => toggleStatus(index)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out
      ${
        item.status
          ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500"
          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500"
      }
    `}
                          >
                            {item.status ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td>
                          <div className={`${style.userDetail} flex flex-col gap-2`}>
                            <Options
                              userId={item._id}
                              openModal={setDeleteModal}
                              onClick={() => {
                                setUserId(item._id);
                              }}
                              fName={item.fName}
                              lName={item.lName}
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
        <Dialog open={isImageModalOpen} onClose={closeImageModal} maxWidth="md">
          <DialogContent>
            <IconButton onClick={() => closeImageModal(false)}>
              <CloseIcon />
            </IconButton>
            <img
              src={selectedImage}
              alt="Expanded View"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "10px",
              }}
            />
          </DialogContent>
        </Dialog>
      </SoftBox>
    </DashboardLayout>
  );
}
