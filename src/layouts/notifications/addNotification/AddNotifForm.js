import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import { fetchApi } from "api";
import validate from "./components/validate";
import style from "./style.module.scss";
import DatePicker from "react-multi-date-picker";
import "./notif.css";
import {
  Button,
  Listbox,
  ListboxItem,
  Pagination,
  Radio,
  RadioGroup,
  Input,
  Textarea,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { styled } from "@mui/material";
import { red, indigo } from "@mui/material/colors";

const AddNotifForm = ({ type }) => {
  const ListUrl = "api/admin/fetch";
  // const userListUrl = "v1/api/admin/user/fetch";
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleProfiles, setToggleProfiles] = useState(false);
  const [chosenProfile, setChosenProfile] = useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({
    title: "",
    text: "",
    type: "private",
    choosenUserId: "",
    time: { from: "", to: "" },
  });
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [placeholder, setPlaceholder] = useState("YYYY/MM/DD to YYYY/MM/DD");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const notifType = type === "USER" ? "user" : "professional";

  const RedButton = styled(Button)(({ theme }) => ({
    backgroundColor: red["300"],
    width: 150,
    color: theme.palette.getContrastText(indigo["A400"]),
    "&:hover": {
      backgroundColor: red["400"],
    },
  }));

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo["500"]),
    backgroundColor: indigo["500"],
    width: 150,
    "&:hover": {
      backgroundColor: indigo["A400"],
    },
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // setErrors({ ...focus, [e.target.name]: true });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggleProfiles(false);
    }
  };
  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const timeHandler = (e, type) => {
    if (!e) return;
    // const rightMonth = e
    // const dateString = `${rightMonth}`;
    const rightMonth = e.month.toString().padStart(2, "0");
    const rightDay = e.day.toString().padStart(2, "0");
    const prevTime = data.time;

    if (type === "to") {
      setData({
        ...data,
        time: { ...prevTime, to: `${e.year}-${rightMonth}-${rightDay}` },
      });
    } else if (type === "from") {
      setData({
        ...data,
        time: { ...prevTime, from: `${e.year}-${rightMonth}-${rightDay}` },
      });
    }
  };

  //access to use list
  const usersList = async () => {
    dispatch(handler(true));
    console.log(type);
    
    const response = await fetchApi(
      ListUrl,
      { collaction: type, query: queryHandler(), page: currentPage },
      "post"
    );
    dispatch(handler(false));
    if (response.status_code === 200) {
      // console.log(response);
      
      setUser(response);
    } else if (response.status_code === 401 && response.description === "unauthorized") {
      navigate("/login", { replace: true });
    } else {
      toast.error(" Something went wrong! ");
    }
  };
  const professinalList = async () => {
    dispatch(handler(true));
    
    const response = await fetchApi(
      ListUrl,
      { collaction: "company", query: {type:type}, page: currentPage },
      "post"
    );
    dispatch(handler(false));
    if (response.status_code === 200) {
      // console.log(response);
      
      setUser(response);
    } else if (response.status_code === 401 && response.description === "unauthorized") {
      navigate("/login", { replace: true });
    } else {
      toast.error(" Something went wrong! ");
    }
  };

  const queryHandler = () => {
    const total = {};
    if (searchValue) {
      total["fName"] = { $regex: searchValue };
    }

    return total;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(handler(true));
      let sendData = {
        userid: data.type == "general" ? "all" : data.choosenUserId,
      };

      const response = await fetchApi(
        "api/admin/add",
        {
          target: type,
          time: data.time,
          gender: "all",
          userid: sendData.userid,
          provinceId: "all",
          txt: data.text,
          title: data.title,
          type: data.type,
          collaction: "notification",
          readed:false
        },
        "post"
      );
      dispatch(handler(false));
      if (response.status_code === 200) {
        // toggleHandler(false);
        // fetchFun();
        navigate(-1); // Adjust the redirection path as needed
        toast.success(" Successfully confirmed! ");
      } else if (response.status_code === 401 && response.description === "unauthorized") {
        navigate("/login", { replace: true });
      } else {
        toast.error(" Something went wrong!  ");
      }
    } else {
      setFocus({
        title: true,
        text: true,
        type: true,
        recievers: true,
        date: true,
      });
      toast.error("  Enter the required values!  ");
    }
  };

  useEffect(() => {
    
    if(type==="user"){
      usersList();
    }else{
      professinalList()
    }
    
  }, [currentPage]);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  //   console.log(errors)
  // }, [errors]);
  return (
    <div className={style.addContainer}>
      <form className={style.contantAddForm} onSubmit={handleSubmit}>
        {["title", "date", "type", "recievers", "text"].map((field) => (
          <div
            className={`${style.formItem} ${field == "recievers" && style.recieverItem}`}
            key={field}
          >
            {field === "date" ? (
              <div className="flex gap-4">
                <div className={style.notifInput}>
                  <label htmlFor={field}> from :</label>
                  <DatePicker
                    placeholder="yyy/mm/dd"
                    showOtherDays
                    className={style.datepickerItem}
                    onChange={(e) => timeHandler(e, "from")}
                  />
                </div>

                <div className={style.notifInput}>
                  <label htmlFor={field}> to :</label>

                  <DatePicker
                    placeholder="yyy/mm/dd"
                    showOtherDays
                    className={style.datepickerItem}
                    onChange={(e) => timeHandler(e, "to")}
                  />
                </div>
              </div>
            ) : field === "type" ? (
              <div id="radioGroup" className={style.notifInput}>
                <label htmlFor={field}> Message type: </label>
                <RadioGroup
                  className={style.notifInput}
                  orientation="horizontal"
                  value={data.type}
                  color="primary"
                  css={{
                    ".nextui-radio-label": {
                      fontSize: "10px",
                    },
                  }}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  <Radio value="general">Public</Radio>
                  <Radio value="private">Private</Radio>
                </RadioGroup>
              </div>
            ) : field === "recievers" && data.type !== "general" ? (
              <>
                <div className={style.recievers}>
                  <label htmlFor={field}> Receiver :</label>

                  <input
                    className={`${style.inputField} "mr-[10px]" ${
                      errors[field] && focus[field] ? style.uncompleted : ""
                    } mr-[20px]`}
                    type="text"
                    placeholder=" choose"
                    value={chosenProfile}
                    onClick={() => setToggleProfiles(!toggleProfiles)}
                    readOnly
                  />
                  {toggleProfiles && (
                    <div
                      ref={dropdownRef}
                      className={`${style.dropDownMenu} w-[100%] max-w-[390px]  border-none shadow-lg mx-1 px-1 py-2  rounded-small border-default-200 dark:border-default-100 right-[16px]`}
                    >
                      <BiSearch className={style.searchIcon} />
                      <input
                        type="search"
                        placeholder="Search..."
                        className={style.searchInput}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />

                      <div className="w-full  px-1 max-h-[260px] overflow-y-auto">
                        <Listbox
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedKeys}
                          onSelectionChange={setSelectedKeys}
                        >
                          {user?.data?.length !== 0 ? (
                            user?.data?.map((item, index) => (
                              <ListboxItem
                                key={item._id}
                                onClick={() => {
                                  setChosenProfile(item.name);
                                  setData({ ...data, choosenUserId: item._id });
                                  setToggleProfiles(!toggleProfiles);
                                }}
                              >
                                {index + (currentPage - 1) * 12 + 1 + "-  " + item.name}
                              </ListboxItem>
                            ))
                          ) : (
                            <ListboxItem disabled>{` User not found!  `}</ListboxItem>
                          )}
                        </Listbox>
                      </div>
                      {user.max_page === 0 ? (
                        ""
                      ) : (
                        <Pagination
                          loop
                          showControls
                          size="sm"
                          color="primary"
                          total={user.max_page}
                          initialPage={currentPage}
                          onChange={handlePageChange}
                          style={{ direction: "ltr" }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : field === "title" ? (
              <div className={style.notifInput}>
                <label htmlFor={field}> title :</label>
                <Input
                  type="text"
                  name={field}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  variant="bordered"
                  classNames={{
                    input: ["text-[14px] !bg-transparent !border-0"],
                    inputWrapper: ["bg-white"],
                  }}
                  color="light"
                  isInvalid={errors[field] ? true : false}
                  errorMessage={errors[field]}
                  className={`${style.notifInput} ${
                    errors[field] && focus[field] ? style.uncompleted : ""
                  }`}
                />
              </div>
            ) : field === "text" ? (
              <div className={`${style.itemContainer}  `}>
                <Textarea
                  variant="faded"
                  label=" Massage "
                  // labelPlacement="outside"
                  className={`  rounded ${style.inputField} ${
                    errors[field] && focus[field] ? style.uncompleted : ""
                  }`}
                  name={field}
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                  value={data.text}
                  rows="200px"
                  cols="100"
                />
              </div>
            ) : (
              ""
            )}
            <span className={style.errorMessage}>
              {errors[field] && focus[field] && errors[field]}
            </span>
          </div>
        ))}

        <div className="flex flex-wrap w-[100%] gap-4 items-center justify-center mt-8 mb-[65px] ">
          <GreenButton type="submit" variant="contained" className="min-w-[200px]">
            Add
          </GreenButton>
          <RedButton
            variant="contained"
            className="min-w-[200px] "
            onClick={() => navigate(-1, { replace: true })}
          >
            Cancel
          </RedButton>
        </div>
      </form>
    </div>
  );
};

export default AddNotifForm;
