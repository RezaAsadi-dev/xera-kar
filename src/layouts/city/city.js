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
import {Pagination} from "@nextui-org/react";
import accessPage from "helper/functios";
import Lotties from "layouts/noData/Lotties";
import LengthNumber from "components/lengthNumber";
import Options from "./components/options";
import SoftButton from "components/SoftButton/index";

const mockCities = [
  { id: 1, name: "New York", country: "USA" },
  { id: 2, name: "London", country: "UK" },
  { id: 3, name: "Tokyo", country: "Japan" },
];
export default function City() {

  const dispatch1 = useDispatch();
  const userurl = "v1/api/admin/user/fetch";
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [openDeleteModal, setDeleteModal] = useState(false);

  const fetchCities = () => {
    // Simulating API fetch; replace with actual API call
    setCities(mockCities);
  };

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
    fetchCities();
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("City")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <>
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={3}>
          <Card style={{  position: "relative" }}>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={4}
              style={{ left: "200px", top: "10px" }}
            >
              <LengthNumber title=" Cities:" number={number?.toLocaleString()} />
              <SoftButton
                className="md:left-4 left-0 text-xs md:text-sm md:px-4 px-2 md:py-2 py-1 !ml-8"
                variant="outlined"
                color="mainColor"
                size="small"
                onClick={() => navigate("/city/addcity")}
              >
                Add City
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
                      <th>City Name</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 12 + index + 1}</td>
                       
                        <td>test</td>
                        <td>Country</td>
                        <td>{item.status ? "active" : "deactive"}</td>
                        {/* <td>{item.dateTime.slice(0, 10)}</td> */}
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
  </>
  );
}
