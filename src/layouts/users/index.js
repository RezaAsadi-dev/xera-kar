import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import styles from "../filterFields/inputsStyles.module.scss";
import style from "./style.module.scss";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import DatePicker from "react-multi-date-picker";
import { Pagination } from "@nextui-org/react";
import accessPage from "helper/functios";
import Lotties from "layouts/noData/Lotties";
import FilterFields from "layouts/filterFields/FilterFields";
import LengthNumber from "components/lengthNumber";
import Options from "./components/options";
import Countries from "assets/countries/countries.json";

function Users() {
  const userUrl = "/api/admin/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [haveFilter, setHaveFilter] = useState(false);
  const dispatch1 = useDispatch();
  const [userStatus, setUserStatus] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    country: "",
    address: "",
    status: "",
    dateTime: "",
  });
  const [enDatetime, setEnDatetime] = useState({
    start: "",
    end: "",
  });
  const [time, setTime] = useState({
    from: "",
    to: "",
  });

  const timeHandler = (e, type) => {
    const rightMonth = e.month.toString().padStart(2, "0");
    const rightDay = e.day.toString().padStart(2, "0");

    if (type === "from") {
      setTime((prev) => ({
        ...prev,
        from: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setEnDatetime((prev) => ({
        ...prev,
        start: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    } else if (type === "to") {
      setTime((prev) => ({
        ...prev,
        to: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setEnDatetime((prev) => ({
        ...prev,
        end: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    }
  };

  const queryHandler = () => {
    const total = {};
    if (filters.name) total["name"] = { $regex: filters.name };
    if (filters.phoneNumber) total["phoneNumber"] = { $regex: filters.phoneNumber };
    if (filters.email) total["email"] = { $regex: filters.email };
    if (filters.country) total["country"] = { $regex: filters.country };
    if (filters.city) total["city"] = { $regex: filters.city };
    if (filters.address) total["address"] = { $regex: filters.address };
    if (filters.status) total["status"] = filters.status === "active" ? true : false;

    if (enDatetime.start && enDatetime.end) {
      total["dateTime"] = {
        $gt: enDatetime.start,
        $lt: enDatetime.end,
      };
    }
    return total;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,11}$/.test(value)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const inputFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "phoneNumber", name: "phoneNumber", type: "text" },
    { label: "Email Adress", name: "email", type: "text" },
    {
      label: "Country",
      name: "country",
      type: "select",
      options: Countries.map((country) => ({ label: country.name, value: country.name })),
    },

    { label: "City", name: "city", type: "text" },
    { label: "Address", name: "address", type: "text" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Deactive", value: "deactive" },
      ],
    },
  ];

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(
      userUrl,
      {
        collaction: "user",
        page: currentPage,
        query: {},
      },
      "post"
    ).then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.data);
        setTotalPages(res?.max_page);
        setnumber(res?.count);
        setHaveFilter(true);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };

  const filterFetch = () => {
    if (Object.keys(queryHandler()).length > 0) {
      dispatch1(handler(true));
      fetchApi(
        userUrl,
        {
          collaction: "user",
          page: currentPage,
          query: queryHandler(),
        },
        "post"
      ).then((res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          setData(res?.data);
          setTotalPages(res?.max_page);
          setnumber(res?.count);
          setHaveFilter(true);
        } else {
          dispatch1(handler(false));
          toast.error("Something went wrong!");
        }
      });
    } else {
      toast.error("No value entered for filter ");
    }
  };
  const handleReset = () => {
    setFilters({
      name: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      address: "",
      status: "",
    });
    setTime({
      from: "",
      to: "",
    });
    setEnDatetime({
      start: "",
      end: "",
    });

    fetchUsers();
    setHaveFilter(false);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <FilterFields
          title=" User list filter "
          resetHandler={handleReset}
          filterFetch={filterFetch}
          haveFilter={haveFilter}
        >
          <div className={styles.filterContainer}>
            {inputFields?.map((field) => (
              <div className={styles.filterFiled} key={field.name}>
                <label htmlFor={field.name}> {field.label} : </label>
                {field.type === "text" && (
                  <input
                    name={field.name}
                    type="text"
                    value={filters[field.name]}
                    onChange={handleChange}
                  />
                )}
                {field.type === "number" && (
                  <input
                    name={field.name}
                    type={field.type}
                    value={filters[field.name]}
                    min="0"
                    max="99999999999"
                    onChange={handleChangeNumber}
                  />
                )}
                {field.type === "select" && (
                  <select name={field.name} value={filters[field.name]} onChange={handleChange}>
                    <option value=""> Choose... </option>
                    {field?.options?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <div className={styles.filterFiled}>
              <label htmlFor="joinDateTo"> DateTime from: </label>
              <DatePicker
                showOtherDays
                calendarPosition="top-right"
                placeholder=" from "
                value={time.from}
                onChange={(e) => timeHandler(e, "from")}
                // render={<CustomInput />}
                containerClassName="!flex  !justify-center "
                inputClass="!h-[36px] !text-sm placeholder:!text-[12px]"
                calendarContainerProps={{
                  style: { zIndex: 999 },
                }}
              />
            </div>
            <div className={styles.filterFiled}>
              <label htmlFor="dateTime"> DateTime to:</label>
              <DatePicker
                showOtherDays
                calendarPosition="top-right"
                placeholder=" to "
                value={time.to}
                onChange={(e) => timeHandler(e, "to")}
                // render={<CustomInput />}
                className="!flex !justify-center !z-[1200]"
                inputClass="!h-[36px] !text-sm placeholder:!text-[12px]"
              />
            </div>
          </div>
        </FilterFields>
        <SoftBox mb={3}>
          <Card
            style={{
              overflow: "visible",
              position: "relative",
              zIndex: 10,
              transform: "translateZ(0)",
            }}
          >
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={4}
              style={{ left: "200px", top: "10px" }}
            >
              <LengthNumber title="Users:" number={number?.toLocaleString()} />

              {/* <SoftButton
              //  style={{ right: "50px", top: "40px" , position: "absolute"}}
                    // sx={{ marginLeft: "outo" }}
                    variant="outlined"
                    color="mainColor"
                    size="small"
                    display="flex"
                    className="md:left-4 left-0 text-xs md:text-sm md:px-4 px-2 md:py-2 py-1 !ml-4"
                    onClick={() => {
                      navigate("/users/adduser");
                    }}
                  >
                    Add User
                  </SoftButton> */}
            </SoftBox>

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
                {data ? (
                  <table className={style.ManagersTable}>
                    <thead>
                      <tr>
                        <th>Row</th>
                        <th>Name</th>
                        <th>phoneNumber</th>
                        <th>Email Address</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Datetime</th>
                        <th>Status</th>
                        <th>operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.email}</td>
                          <td>{item.country}</td>
                          <td>{item.city}</td>
                          <td>{item.address}</td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>{item.status ? "Active" : "Deactive"}</td>
                          <td className={`${style.userDetail} flex flex-col items-center gap-2`}>
                            <Options
                              data={item}
                              status={item.status}
                              id={item._id}
                              openModal={setDeleteModal}
                              onClick={() => {
                                setUserId(item._id);
                                setUserStatus(item.status ? deactive : active);
                              }}
                              userId={item._id}
                              refetch={fetchUsers}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Lotties />
                )}
              </SoftBox>
            </div>
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
  );
}

export default Users;
