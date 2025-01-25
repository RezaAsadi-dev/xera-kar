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
import Options from "./options";
import image1 from "assets/images/profile.jpg";
import DatePicker from "react-multi-date-picker";
import FilterFields from "layouts/filterFields/FilterFields";

function Requests() {
  const dispatch1 = useDispatch();
  const requestUrl = "api/admin/fetch";
  const categoryUrl = "api/admin/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [des, setDes] = useState();
  const [haveFilter, setHaveFilter] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [category, setCategory] = useState();
   const [subCat, setSubCat] = useState();
  const [enDatetime, setEnDatetime] = useState({
    start: "",
    end: "",
  });
  const [time, setTime] = useState({
    from: "",
    to: "",
  });
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    subcategory: "",
    date: "",
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

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(requestUrl, { collaction: "request", query: {}, page: currentPage }, "post").then(
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
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    getCategory();
    categorySelect();
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleReset = () => {
    setFilters({
      title: "",
      img: "",
      category: "",
      subcategory: "",
      date: "",
      description: "",
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

    fetchUsers();
    setHaveFilter(false);
  };

  const filterFetch = () => {
    console.log(queryHandler());
    
    if (Object.keys(queryHandler()).length > 0) {
      dispatch1(handler(true));
      fetchApi(
        requestUrl,
        {
          collaction: "request",
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
    { label: "Title", name: "title", type: "text" },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: category?.map((cat) => ({ label: cat?.title, value: cat?.title })),
    },
    {
      label: "Subcategory",
      name: "subcategory",
      type: "select",
      options: subCat?.map((sub) => ({ label: sub?.title, value: sub?.title })),
    },
    { label: "Deadline", name: "date", type: "text" },
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
    if (filters.title) total["title"] = { $regex: filters.title };
    if (filters.category) total["category"] = { $regex: filters.category };
    if (filters.subcategory) total["subcategory"] = { $regex: filters.subcategory };
    if (filters.date) total["date"] = { $regex: filters.date };
    if (filters.status) total["status"] = filters.status === "active" ? true : false;

    if (enDatetime.start && enDatetime.end) {
      total["dateTime"] = {
        $gt: enDatetime.start,
        $lt: enDatetime.end,
      };
    }
    return total;
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
  const categorySelect = () => {
    // console.log(id);
    dispatch1(handler(true));
    fetchApi(categoryUrl, { collaction: "subcat", query: {}, page: "all" }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        console.log(res?.data);

        setSubCat(res?.data);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  const desModal = (item) => {
    setDes(item?.description);
    onOpen(item?._id);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
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

            <div className={styles.filterFiled}>
              <label htmlFor="joinDateTo"> DateTime from: </label>
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
            </div>
            <div className={styles.filterFiled}>
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
              <LengthNumber title="Requests:" number={number?.toLocaleString()} />
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
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>DateTime</th>
                      <th>Deadline</th>
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
                          {item?.projectImg ? (
                            <div className={`${style.userDetail} flex flex-col gap-2 items-center`}>
                              <img
                                src={item?.projectImg}
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
                        <td>{item?.title}</td>
                        <td>{item?.category}</td>
                        <td>{item?.subcategory}</td>
                        <td>{item?.dateTime?.slice(0, 10)}</td>
                        <td>{item?.date?.slice(0, 10)}</td>
                        <td>
                          <Button onPress={() => desModal(item)}>View</Button>
                        </td>
                        <td>{item?.status ? "Active" : "Inactive"}</td>
                        <td>
                          <div className={`${style.userDetail} flex flex-col gap-2`}>
                            <Options
                              userId={item?._id}
                              phoneNumber={item?.phoneNumber}
                              fName={item?.fName}
                              lName={item?.lName}
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
              {data && (
                <Pagination
                  showControls
                  page={currentPage}
                  total={totalPages}
                  initialPage={1}
                  onChange={handlePageChange}
                />
              )}
              <Modal
                classNames={{ backdrop: "z-[99999]", wrapper: "z-[99999]" }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1"> Description </ModalHeader>
                      <ModalBody>{des}</ModalBody>
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
        <Card className="mt-[15px] p-[15px]  ">
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

export default Requests;
