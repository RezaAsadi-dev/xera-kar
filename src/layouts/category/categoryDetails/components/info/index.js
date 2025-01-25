import React, { useState } from "react";
import { Card, MenuItem } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import style from "./style.module.css";
import { IoMdAddCircle } from "react-icons/io";
import LengthNumber from "components/lengthNumber";
import CategotyModal from "layouts/category/components/modal/CategoryModal";
import image1 from "assets/images/profile.jpg";
import { fetchApi } from "api";
import { truncateString } from "helper/functios";

function Infos({ info, fetchData }) {
  const updateurl = "api/admin/update";
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
  };
  const toggleStatus = (id, status) => {
    fetchApi(updateurl, { collaction: "subcat", id: id, status: !status }, "put").then((res) => {
      if (res.status_code === 200) {
        fetchData();
      }
    });
  };
  return (
    <div className="h-screen">
      <Card style={{ padding: "20px" }}>
        <div className=" flex justify-between py-4 ">
          <SoftTypography style={{ padding: "10px 0", fontSize: "16px", color: "#3f3f3f" }}>
            Category Title
          </SoftTypography>
          <MenuItem divider selected onClick={handleClick} disableRipple className="mr-8">
            <IoMdAddCircle className="text-[20px] mr-[12px]" />
            Add Subcategory
          </MenuItem>
        </div>
        <div className="overflow-auto">
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
                  <th>Title</th>
                  <th>Created at</th>
                  <th>Subcategory Count</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {info?.img ? (
                      <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                        <img
                          src={info?.img}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "20%",
                            transition: "transform 0.8s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
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
                  <td>{info?.title}</td>
                  <td>{info?.dateTime?.slice(0, 10)}</td>
                  <td>{ info?.sub?.length }</td>
                  <td>{info?.status ? "active" : "deactive"}</td>
                </tr>
              </tbody>
            </table>
          </SoftBox>
        </div>
      </Card>
      <div className=" flex  justify-evenly mt-8 *:w-full space-x-20">
        <Card sx={{ overflowY: "auto" }}>
          <div className="p-4">
            <LengthNumber title="Sub Categories:" number={info?.sub?.length} />
          </div>
          <div className=" overflow-auto">
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
                    <th> Created at </th>
                    <th> Description</th>
                    <th> Status </th>
                  </tr>
                </thead>
                <tbody>
                  {info?.sub?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item?.img ? (
                          <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                            <img
                              src={item?.img}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "20%",
                                transition: "transform 0.8s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
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
                      <td>{item?.title}</td>
                      <td>{item?.dateTime?.slice(0, 10)}</td>
                      <td>{ truncateString(item?.description,20) }</td>
                      <td>
                        <button
                          onClick={() => toggleStatus(item._id, item.status)}
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
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
            </SoftBox>
          </div>
        </Card>
      </div>
      {openModal && <CategotyModal closeModal={() => setOpenModal(false)} fetchData={fetchData} />}
    </div>
  );
}

export default Infos;
