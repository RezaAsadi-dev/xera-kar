// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import typography from "assets/theme/base/typography";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import { fetchApi } from "api";
import { useEffect, useState } from "react";
import "./dashboard.css";
import toast from "react-hot-toast";
import accessPage from "../../helper/functios";
import { Select, MenuItem, FormControl } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Dashboard() {
  const dispatch = useDispatch();
  const dashboardUrl = "api/admin/dashboard";
  // dispatch(handler(true));

  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [Type, setType] = useState("admin");
  const [dashboardData, setDashboardData] = useState({});
  const [timeRange, setTimeRange] = useState("monthly");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    handleTimeRangeChange(value); // Set the selected value
    handleClose();
  };
  const handleTimeRangeChange = (event) => {
    const selectedTimeRange = event.target.value;
    setTimeRange(selectedTimeRange);
  };

  const fetchData = (selectedTimeRange) => {
    dispatch(handler(true));

    fetchApi(
      dashboardUrl,
      {
        type: Type,
        query: "selectedTimeRange",
      },
      "post"
    ).then((res) => {
      if (res) {
        setDashboardData(res);
      } else if (res.status_code === 401 && res.description === "unauthorized") {
        navigate("/login", { replace: true });
      } else {
        toast.error(" Something went wrong! ");
      }
      dispatch(handler(false));
    });
  };

  useEffect(() => {
    if (timeRange) {
      fetchData(timeRange);
    }

    if (accessPage("Dashboard")) {
      navigate("/inaccessibility");
    }
  }, [timeRange, Type]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <DashboardNavbar />
      <SoftBox py={2} style={{ flexGrow: 1 }}>
        <SoftBox mb={2}>
          <Grid container spacing={3} justifyContent="flex-start">
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("admin")}
              className={`${Type === "admin" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # managers " }}
                count={Number(dashboardData.operatorCount).toLocaleString()}
                percentage={{ color: "success", text: "manager" }}
                icon={{ color: "info", component: "person" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("user")}
              className={`${Type === "user" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: "  # users" }}
                count={Number(dashboardData.userCount).toLocaleString()}
                percentage={{ color: "success", text: "user" }}
                icon={{ color: "info", component: "group" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("professional")}
              className={`${Type === "professional" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: "#professionals" }}
                count={Number(dashboardData.PROFESSIONALSCount).toLocaleString()}
                percentage={{ color: "success", text: " pros" }}
                icon={{ color: "info", component: "manage_accounts_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("category")}
              className={`${Type === "category" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # category " }}
                count={Number(dashboardData.catCount).toLocaleString()}
                percentage={{ color: "success", text: "categories" }}
                icon={{ color: "info", component: "category_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("request")}
              className={`${Type === "request" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # requests " }}
                count={Number(dashboardData.requestCount).toLocaleString()}
                percentage={{ color: "success", text: "request" }}
                icon={{ color: "info", component: "request_page" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("comment")}
              className={`${Type === "comment" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # comments " }}
                count={Number(dashboardData.commentCount).toLocaleString()}
                percentage={{ color: "success", text: "comments" }}
                icon={{ color: "info", component: "mark_chat_unread_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("slider")}
              className={`${Type === "slider" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # slider " }}
                count={Number(dashboardData.sliderCount).toLocaleString()}
                percentage={{ color: "success", text: "sliders" }}
                icon={{ color: "info", component: "tune_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("advisment")}
              className={`${Type === "advisment" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # advisment " }}
                count={Number(dashboardData.advismentCount).toLocaleString()}
                percentage={{ color: "success", text: "advisements" }}
                icon={{ color: "info", component: "queue_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("notfication")}
              className={`${Type === "notfication" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # notfications " }}
                count={Number(dashboardData.notificationCount).toLocaleString()}
                percentage={{ color: "success", text: "Notifs" }}
                icon={{ color: "info", component: " circle_notifications_icon" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              onClick={() => setType("support")}
              className={`${Type === "support" && "selectedItem"} cursor-pointer`}
            >
              <MiniStatisticsCard
                className="dashboardIcon"
                title={{ text: " # support " }}
                count={Number(dashboardData.ticketCount).toLocaleString()}
                percentage={{ color: "success", text: "tickets" }}
                icon={{ color: "info", component: "support_agent" }}
                style={{ minHeight: "120px" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={0}>
          <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} lg={12}>
              <GradientLineChart
                height="22rem"
                className="!justify-between"
                title="Statistics"
                description={
                  <SoftBox display="flex" alignItems="center" justifyContent="space-between">
                    <div className="flex">
                      <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon className="font-bold">arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          Statistics are {timeRange}
                        </SoftTypography>
                      </SoftTypography>
                    </div>
                    <div
                    // className=" !ml-0 sm:ml-[100px] md:ml-[200px] lg:ml-[400px] xl:ml-[600px] !inline-block !w-[100px] "
                    >
                      <FormControl variant="outlined" size="medium">
                        <Select
                          value={timeRange}
                          onChange={handleTimeRangeChange}
                          displayEmpty
                          endAdornment={<ArrowDropDownIcon />}
                          sx={{
                            height: "auto",
                            padding: "0.5rem 0.75rem !important",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            backgroundColor: "#ffffff",
                            border: "1px solid #d2d6da",
                            borderRadius: "0.5rem",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "gray",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid gray",
                            },
                          }}
                          IconComponent={ArrowDropDownIcon}
                        >
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </SoftBox>
                }
                chart={{
                  labels: dashboardData?.chatData?.x,
                  datasets: [
                    {
                      label: Type,
                      color: "mainColor",
                      data: dashboardData?.chatData?.y,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <Card className=" p-[15px]" style={{ marginTop: "20px" }}>
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

export default Dashboard;
