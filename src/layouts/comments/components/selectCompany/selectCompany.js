import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Input, Listbox, ListboxItem, Pagination } from "@nextui-org/react";
import { fetchApi } from "api";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import style from "./style.module.scss";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../../redux/loaderSlice";
export default function SelectCompany({
  chosenUser,
  setChosenUser,
  setToggleUserSelect,
  toggleUserSelect,
  setToggleCompanySelect,
  toggleCompanySelect,
  name,
  data,
  filters,
  setFilters,
}) {
  const userUrl = "/api/admin/fetch";

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleProfiles, setToggleProfiles] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [users, setUsers] = useState();
  const [company, setCompany] = useState();
  const [dis, setDis] = useState("");
  const dispatch1 = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //     fetchUsers();
  //   }
  // }, [open]);

  const queryHandler = () => {
    const total = {};
    if (searchValue) {
      total["name"] = { $regex: searchValue };
    }

    return total;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggleProfiles(false);
    }
  };

  const fetchUsers = () => {
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
        setMaxPage(res?.page);
        setUsers(res?.data);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  const getCompany = () => {
    dispatch1(handler(true));
    fetchApi(
      userUrl,
      {
        collaction: "company",
        page: currentPage,
        query: queryHandler(),
      },
      "post"
    ).then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setMaxPage(res?.page);
        setCompany(res?.data);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };

  useEffect(() => {
    if (name === "user") {
      fetchUsers();
    } else {
      getCompany();
    }

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, [searchValue, currentPage]);
  const getAgentDetailsById = (agentid, options) => {
    if (!agentid || !Array.isArray(options)) return null;

    const agent = options.find((option) => option._id === agentid);
    return agent ? { username: agent.username, discodeCount: agent.discodeCount } : null;
  };

  // useEffect(() => {
  //   if (data.agentid) {
  //     const agentDetails = getAgentDetailsById(data.agentid, options);
  //     if (agentDetails) {
  //       setChosenUser(agentDetails.username);
  //       setDis(agentDetails.discodeCount);
  //     }
  //   }
  // }, [data.agentid, options]);

  return (
    <div className={`${style.recievers} `}>
      <div
        ref={dropdownRef}
        className={`${style.dropDownMenu} w-full border-none shadow-lg mx-1 px-1 py-2 rounded-small border-default-200 dark:border-default-100`}
      >
        <div className={style.searchContainer}>
          {!searchValue && <BiSearch className={style.searchIcon} />}
          <input
            type="search"
            placeholder="search..."
            className={style.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="w-full px-1 max-h-[230px] overflow-y-auto">
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            defaultSelectedKeys={[data?.agentid]}
            selectionMode="single"
            selectedKeys={[data?.agentid]}
            onChange={(e) => setData((prev) => ({ ...prev, agentid: e.target.value }))}
          >
            {name === "user" &&
              (users ? (
                users?.map((item, index) => (
                  <ListboxItem
                    key={item._id}
                    onClick={() => {
                      setChosenUser({ ...chosenUser, user: item.name });
                      setDis(item.discodeCount);
                      setFilters({ ...filters, userid: item?._id });
                      // setData({ ...data, agentid: item._id });
                      setToggleUserSelect(!toggleUserSelect);
                    }}
                  >
                    <div className="flex justify-between">
                      <p>{item?.name}</p>
                    </div>
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem disabled>{`Not Found`}</ListboxItem>
              ))}
            {name === "company" &&
              (company ? (
                company.map((item, index) => (
                  <ListboxItem
                    key={item._id}
                    onClick={() => {
                      setChosenUser({ ...chosenUser, company: item.name });
                      setDis(item.discodeCount);
                      setFilters({
                        ...filters,
                        companyid: item?._id,
                      });
                      // setData({ ...data, agentid: item._id });
                      setToggleCompanySelect(!toggleCompanySelect);
                    }}
                  >
                    <div className="flex justify-between">
                      <p>{item?.name}</p>
                    </div>
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem disabled>{`Not Found`}</ListboxItem>
              ))}
          </Listbox>
        </div>
        {maxPage === 0 ? (
          ""
        ) : (
          <Pagination
            loop
            showControls
            size="sm"
            color="primary"
            total={maxPage}
            initialPage={currentPage}
            onChange={handlePageChange}
            style={{ direction: "ltr" }}
          />
        )}
      </div>
    </div>
  );
}
