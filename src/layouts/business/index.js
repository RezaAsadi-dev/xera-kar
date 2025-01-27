import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import FilterFields from "layouts/filterFields/FilterFields";
import styles from "../filterFields/inputsStyles.module.scss";
import DatePicker from "react-multi-date-picker";
import { Card } from "@nextui-org/react";
import LengthNumber from "components/lengthNumber";
import Options from "./options";
import { Pagination } from "@nextui-org/react";
import Lotties from "layouts/noData/Lotties";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import { fetchApi } from "api";
import accessPage from "helper/functios";
import toast from "react-hot-toast";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import Countries from "assets/countries/countries.json";
import { truncateString } from "helper/functios";

export default function Business() {
  const categoryUrl = "api/admin/fetch"; 
  const bussinessUrl = "api/admin/fetch";
  const [number, setnumber] = useState();
  const navigate = useNavigate();
  const [haveFilter, setHaveFilter] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState();
  const dispatch1 = useDispatch();
  const [userStatus, setUserStatus] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
 

  const [filters, setFilters] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    services_products: "",
    category: "",
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
    const total = {type:"business"};
    if (filters.name) total["name"] = { $regex: filters.name };
    if (filters.phoneNumber) total["phoneNumber"] = { $regex: filters.phoneNumber };
    if (filters.country) total["country"] = { $regex: filters.country };
    if (filters.services) total["services"] = { $regex: filters.services };
    if (filters.category) total["category"] = { $regex: filters.category };
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
    { label: "Company Name", name: "name", type: "text" },
    { label: "Company PhoneNumber", name: "phoneNumber", type: "number" },
    {
      label: "Country",
      name: "country",
      type: "select",
      options: Countries.map((country) => ({ label: country.name, value: country.name })),
    },
    { label: "Services & Products", name: "services", type: "text" },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: category?.map((cat) => ({ label: cat?.title, value: cat?.title })),
    },
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
    fetchApi(bussinessUrl, { collaction: "company", page: currentPage, query: {type:"business"} }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          setData(res?.data);
          setnumber(res?.count);
          setTotalPages(res?.max_page);
        } else {
          dispatch1(handler(false));
          toast.error("  Something went wrong!");
        }
      }
    );
  };

  const filterFetch = () => {
    if (Object.keys(queryHandler()).length > 0) {
      dispatch1(handler(true));
      fetchApi(
        bussinessUrl,
        { collaction: "company", page: currentPage, query: queryHandler() },
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
  const getCategory = async () => {
    dispatch1(handler(true));
    await fetchApi(categoryUrl, { collaction: "cat", query: {}, page: "all" }, "post").then(
      (res) => {
        if (res?.status_code === 200) {
          dispatch1(handler(false));
          // console.log(res.data);

          setCategory(res?.data);
          // setnumber(res?.count);
          // setTotalPages(res?.max_page);
        } else {
          dispatch1(handler(false));
          toast.error("Something went wrong!");
        }
      }
    );
  };

  const handleReset = () => {
    setFilters({
      coName: "",
      coPhoneNumber: "",
      country: "",
      coAddress: "",
      servic_product: "",
      type: "",
      category: "",
      yearsOfExperience: "",
      coWebsite: "",
      coAbout: "",
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
    getCategory()
    if (accessPage("Business")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <FilterFields
          title=" Business list filter "
          resetHandler={handleReset}
          filterFetch={filterFetch}
          haveFilter={haveFilter}
        >
          <div className={styles.filterContainer}>
            {inputFields?.map((field) => (
              <div className={styles.filterFiled} key={field.name}>
                <label htmlFor={field.name}> {field.label} </label>
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
              <label htmlFor="joinDateFrom"> DateTime from:</label>
              <DatePicker
                showOtherDays
                calendarPosition="bottom-right"
                placeholder="from ..."
                value={time.from}
                onChange={(e) => timeHandler(e, "from")}
                containerClassName="!flex !justify-center"
                inputClass="!h-[36px] !text-sm placeholder:!text-[12px]"
              />
            </div>
            <div className={styles.filterFiled}>
              <label htmlFor="joinDateTo"> DateTime to: </label>
              <DatePicker
                showOtherDays
                calendarPosition="bottom-right"
                placeholder=" to ... "
                value={time.to}
                onChange={(e) => timeHandler(e, "to")}
                containerClassName="!flex !justify-center "
                inputClass="!h-[36px] !text-sm placeholder:!text-[12px]"
              />
            </div>
          </div>
        </FilterFields>
        <SoftBox mb={3}>
          <Card style={{ position: "relative" }}>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={4}
              style={{ left: "200px", top: "10px" }}
            >
              <LengthNumber title="Business:" number={number?.toLocaleString()} />

              <SoftButton
                sx={{ marginLeft: "15px" }}
                variant="outlined"
                color="mainColor"
                size="small"
                display="flex"
                onClick={() => {
                  navigate("/business/addbusiness");
                }}
              >
                Add Business
              </SoftButton>
            </SoftBox>
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
                {data ? (
                  <table className={style.ManagersTable}>
                    <thead>
                      <tr>
                        <th>Row</th>
                        <th>Company name</th>
                        <th>Company PhoneNumber</th>
                        <th>Country</th>
                        <th>Company Address </th>
                        <th>Services & Products</th>
                        <th>Category</th>
                        <th>Years of experience</th>
                        <th>Company Website</th>
                        <th>About Company</th>
                        <th>DateTime</th>
                        <th>Status</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td>{truncateString(item?.name,10)}</td>
                          <td>{item?.phoneNumber}</td>
                          <td>{item?.country}</td>
                          <td>{ truncateString(item?.address,10) }</td>
                          <td>{ truncateString(item?.services,10) }</td>
                          <td>{item?.category}</td>
                          <td>{item?.yearofExperience}</td>
                          <td>{item?.companyWebsite}</td>
                          <td>{ truncateString(item?.about,10) }</td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>{item.status ? "Active" : "Deactive"}</td>
                          <td className={`${style.userDetail} flex flex-col items-start gap-2`}>
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
        <Card className="mb-[15px] p-[15px]">
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
