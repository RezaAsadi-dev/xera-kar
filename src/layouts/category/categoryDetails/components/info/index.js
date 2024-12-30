import React, { useState } from "react";
import { Card, MenuItem } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import style from "./style.module.css";
import { IoMdAddCircle } from "react-icons/io";
import LengthNumber from "components/lengthNumber";
import { useNavigate } from "react-router-dom";
import CategotyModal from "layouts/category/components/modal/CategoryModal";
import image1 from "assets/images/profile.jpg";


function Infos({ info, title }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  

  const infoItems = [
    { label: "ّImage", value: "img" },
    { label: "Title ", value: "title" },
    { label: " Date Time", value: "dateTime", fun: (dateTime) => dateTime?.slice(0, 10) },
    { label: "Subcategory Count ", value: "subcategoryCount" },
    { label: "Status", name: "status", type: "select" ,
      options: [
        { label: "Active", value: "active" },
        { label: "Deactive", value: "deactive" }
      ]
    },  ];
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
  const handleClick = (id) => {
    setOpenModal(true);
  };
  return (
    <div className="h-screen ">
      <Card style={{ padding: "20px" }}>
        <div className=" flex justify-between py-4 ">
          <SoftTypography style={{ padding: "10px 0", fontSize: "16px", color: "#3f3f3f" }}>
            Category Title
          </SoftTypography>
          {/* <div className=" border flex justify-center items-center shadow-sm"> */}
          <MenuItem divider  selected  onClick={handleClick} disableRipple className="mr-8">
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
                  <th>Title </th>
                  <th> Created at </th>
                  <th>Subcategory Count</th>
                  <th> Status </th>
                </tr>
              </thead>
              <tbody>
              <tbody>
                    {data?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.profilePic ? (
                            <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                              <img
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
                        <td>{item.fName}</td>
                        <td>{item.dateTime.slice(0, 10)}</td>
                        <td>{item.weight}</td>
                        {/* <Button onPress={onOpen}> Add Sub </Button> */}

                        <td>{item.status ? "active" : "deactive"}</td>

                        
                      </tr>
                    ))}
                  </tbody>
              </tbody>
            </table>
          </SoftBox>
        </div>
        {/* <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        <span>{title}</span>
      </SoftTypography> */}
      </Card>
      <div className=" flex  justify-evenly mt-8 *:w-full space-x-20">
        <Card sx={{ overflowY: "auto" }}>
          <div className="p-4">
            <LengthNumber title=" Categories:" number={10} />
          </div>

          {/* <SoftTypography style={{padding:"20px "}}>
            CategoryDetails
          </SoftTypography> */}
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
                    <th>Subcategory Count</th>
                    <th> Status </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                </tbody>
              </table>
            </SoftBox>
          </div>

        </Card>
      </div>
      {openModal && <CategotyModal closeModal={() => setOpenModal(false)} />}
    </div>
  );
}

export default Infos;
