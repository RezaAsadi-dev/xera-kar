import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.scss";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import FilterFields from "layouts/filterFields/FilterFields";
import DatePicker from "react-multi-date-picker";
import styles from "../filterFields/inputsStyles.module.scss";
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
  const commentsUrl = "api/admin/fetch";
  const updateStatus = "api/admin/update";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [status, setStatus] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState();
  const [haveFilter, setHaveFilter] = useState(false);
  const [enDatetime, setEnDatetime] = useState({
    start: "",
    end: "",
  });
  const [time, setTime] = useState({
    from: "",
    to: "",
  });
  const [filters, setFilters] = useState({
    companyid: "",
    userid: "",
    status: "",
  });
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
  useEffect(() => {
    if (data.length) {
      setStatusData(data.map((item) => ({ ...item, status: item.status || false })));
    }
  }, [data]);

  const getComments = () => {
    dispatch1(handler(true));
    fetchApi(commentsUrl, { collaction: "comment", query: {}, page: currentPage }, "post").then(
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getComments();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  const handelModal = (vlue) => {
    setModalData(vlue);
    onOpen();
  };
  const toggleStatus = (status, id) => {
    // const updatedStatus = statusData.map((item, index) =>
    //   idx === index ? { ...item, status: !item.status } : item
    // );
    // console.log(updatedStatus);

    fetchApi(updateStatus, { collaction: "comment", id, status: !status }, "put").then((res) => {
      if (res?.status_code === 200) {
        getComments();
        toast.success(" Request deactivated successfully! ");
      } else {
        dispatch1(handler(false));
        toast.error(" Something went wrong !");
      }
    });
    // setStatusData(updatedStatus);
  };

  const handleReset = () => {
    setFilters({
      companyid: "",
      userid: "",
      status: "",
      dateTime: "",
    });
    setTime({
      from: "",
      to: "",
    });
    setEnDatetime({
      start: "",
      end: "",
    });

    getComments();
    setHaveFilter(false);
  };

  const filterFetch = () => {
    if (Object.keys(queryHandler()).length > 0) {
      dispatch1(handler(true));
      fetchApi(
        commentsUrl,
        {
         collaction: "comment",
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
  const inputFields = [
    { label: "Company", name: "companyid", type: "text" },
    { label: "User", name: "userid", type: "text" },

    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const timeHandler = (e, type) => {
    const rightMonth = e.month.toString().padStart(2, "0");
    const rightDay = e.day.toString().padStart(2, "0");

    if (type === "birthFrom") {
      setBirthTime((prev) => ({
        ...prev,
        from: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setBirthDatetime((prev) => ({
        ...prev,
        start: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    } else if (type === "birthTo") {
      setBirthTime((prev) => ({
        ...prev,
        to: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setBirthDatetime((prev) => ({
        ...prev,
        end: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    } else {
      if (type === "from") {
        setTime((prev) => ({
          ...prev,
          from: `${e.year}-${rightMonth}-${rightDay}`,
        }));
        setEnDatetime((prev) => ({
          ...prev,
          start: `${e.year}-${rightMonth}-${rightDay}`,
        }));
      } else {
        setTime((prev) => ({
          ...prev,
          to: `${e.year}-${rightMonth}-${rightDay}`,
        }));
        setEnDatetime((prev) => ({
          ...prev,
          end: `${e.year}-${rightMonth}-${rightDay}`,
        }));
      }
    }
  };
  const queryHandler = () => {
    const total = {};
    if (filters.companyid) total["companyid"] = { $regex: filters.companyid };
    console.log(filters.companyid);
    if (filters.userid) total["userid"] = { $regex: filters.userid };
    if (filters.status) total["status"] = filters.status === "active" ? true : false;
    if (filters.dateTime) total["dateTime"] = { $regex: filters.dateTime };

    if (enDatetime.start && enDatetime.end) {
      total["dateTime"] = {
        $gt: enDatetime.start,
        $lt: enDatetime.end,
      };
    }
    return total;
  };

  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((star, index) => (
            <span key={`full-${index}`} style={{ color: "gold" }}>
              {star}
            </span>
          ))}
        {halfStar && <span style={{ color: "gold" }}>&#9733;</span>}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} style={{ color: "gray" }}>
              {star}
            </span>
          ))}
      </>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className=" mt-4">
        <SoftBox>
          <FilterFields
            title=" Request list filter "
            resetHandler={handleReset}
            filterFetch={filterFetch}
            haveFilter={haveFilter}
          >
            <div className={styles.filterContainer}>
              {inputFields?.map((field) => (
                <div className={`${styles.filterFiled}  `} key={field.name}>
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

              {/* <div className={styles.filterFiled}>
                <label htmlFor="joinDateTo"> Create At: </label>
                <DatePicker
                  showOtherDays
                  calendarPosition="top-right"
                  placeholder=" from "
                  value={time.from}
                  onChange={(e) => timeHandler(e, "from")}
                  containerClassName="!flex  !justify-center "
                  inputClass="!h-[36px] !text-sm placeholder:!text-[12px]"
                  calendarContainerProps={{
                    style: { zIndex: 999 },
                  }}
                />
              </div> */}
              {/* <div className={styles.filterFiled}>
                <label htmlFor="joinDateTo"> DateTime to: </label>
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
              </div> */}
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
                        <th>Company</th>
                        <th>User</th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td className=" underline hover:opacity-100">
                            <Link to={`/companydetails/${item?.companyid}`}>{item?.companyid}</Link>
                          </td>
                          <td className=" underline  hover:opacity-100">
                            <Link to={`/users/usersDetails/${item.userid}`}>{item.userid}</Link>
                          </td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>
                            {item?.description.length > 50 ? (
                              <Button
                                onPress={() => {
                                  handelModal(item?.description);
                                }}
                              >
                                View detail
                              </Button>
                            ) : (
                              item?.description
                            )}
                          </td>
                          <td>{renderStars(item?.score)}</td>
                          <td>
                            <button
                              onClick={() => toggleStatus(item?.status, item?._id)}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out
      ${
        item?.status
          ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500"
          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500"
      }
      focus:outline-none focus:ring-2 focus:ring-offset-2`}
                            >
                              {item?.status ? "Active" : "Inactive"}
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
                          {modalData}
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
