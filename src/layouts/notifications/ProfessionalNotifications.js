import React from "react";
import { useLocation } from "react-router-dom";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import PublicMessages from "./components/publicMessages/PublicMessages";
import PrivateMessages from "./components/privateMessages/PrivateMessages";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";
import style from "./style.module.scss";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import { fetchApi } from "api";
import accessPage from "helper/functios";
import toast from "react-hot-toast";
import { debounce } from "lodash";


const ProNotif = () => {
  const tabData = [
    {
      id: 0,
      title: "Public notifications  ",
    },
    {
      id: 1,
      title: " Private notifications ",
    },
  ];
  const [selected, setSelected] = useState("0");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tificationUrl = "v1/api/admin/notification/fetch";
  const location = useLocation();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState({
    public: true,
    private: true,
  });

  const [data, setData] = useState({
    privateNotification: {},
    publicNotification: {},
  });
  const [pages, setPages] = useState({
    public: 1,
    private: 1,
  });
  // Fetch public notifications
  const fetchPublicNotification = async () => {
    dispatch(handler(true));
    setLoading({ ...loading, public: true });
    fetchApi(
      tificationUrl,
      { query: { type: "general", target }, page: pages.public },
      "post"
    ).then((res) => {
      if (res.status_code === 200) {
        setData((prevData) => ({
          ...prevData,
          publicNotification: res,
        }));
      } else if (res.status_code === 401 && res.description === "unauthorized") {
        navigate("/login", { replace: true });
      } else {
        toast.error(res.message || "Something went wrong!  ");
      }
      dispatch(handler(false));
      setLoading({ ...loading, public: false });
    });
  };

  // Fetch private notifications
  const fetchPrivateNotification = async () => {
    dispatch(handler(true));
    setLoading({ ...loading, private: true });

    fetchApi(
      tificationUrl,
      { query: { type: "private", target }, page: pages.private },
      "post"
    ).then((res) => {
      if (res.status_code === 200) {
        setData((prevData) => ({
          ...prevData,
          privateNotification: res,
        }));
      } else if (res.status_code === 401 && res.description === "unauthorized") {
        navigate("/login", { replace: true });
      } else {
        toast.error(res.message || " Something went wrong! ");
      }
      dispatch(handler(false));
      setLoading({ ...loading, private: false });
    });
  };

  useEffect(() => {
    fetchPublicNotification(), fetchPrivateNotification();
  }, [pages.public, location]);

  // useEffect(() => {

  // }, [pages.private, location]);

  const target = location.pathname.split("/")[2];


  const handlePageChange = debounce((pageNumber) => {
    setCurrentPage(pageNumber);
  }, 300);
  
  useEffect(() => {
    if (selected === "0") {
      fetchPublicNotification();
    } else if (selected === "1") {
      fetchPrivateNotification();
    }
  }, [selected, pages.public, pages.private]);

  useEffect(() => {
    if (accessPage("Notifications")) {
      navigate("/inaccessibility");
    }
  }, [currentPage]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ overflow: "auto" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6"> Notifications: </SoftTypography>
              <SoftButton
                variant="outlined"
                color="mainColor"
                size="small"
                onClick={() => {
                  navigate("/notifications/AddNotif", { state: { type: target } });
                }}
              >
                Add notification
              </SoftButton>
            </SoftBox>
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
              <div className="h-auto m-5">
                <Tabs
                  color="primary"
                  size="sm"
                  items={tabData}
                  selectedKey={selected}
                  onSelectionChange={(key) => {
                    setSelected(key.toString());
                  }}
                >
                  {(item) => (
                    <Tab
                      key={item.id}
                      title={
                        <div className="flex items-center gap-x-2">
                          <span>{item.title}</span>
                          <Chip size="sm" variant="solid" color="default">
                            {item.id
                              ? data.privateNotification.count || 0
                              : data.publicNotification.count || 0}
                          </Chip>
                        </div>
                      }
                    ></Tab>
                  )}
                </Tabs>
                {selected === "0" ? (
                  <PublicMessages
                    Notifications={data.publicNotification}
                    loading={false}
                    setPages={setPages}
                    pages={pages}
                    // onReadClick={markAsRead}
                  />
                ) : (
                  <PrivateMessages
                    Notifications={data.privateNotification}
                    loading={false}
                    setPages={setPages}
                    pages={pages}
                    // onReadClick={markAsRead}
                  />
                )}
                <Pagination
                  className={style.paginationContainer}
                  showControls
                  page={currentPage}
                  total={totalPages}
                  initialPage={1}
                  onChange={handlePageChange}
                />
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
        <Card className="mt-[150px] p-[15px]">
          <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
            <span>
              © All rights of this site belong to XeraKar company. Any copying is prosecuted.
            </span>
          </div>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
};

export default ProNotif;
