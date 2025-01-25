import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import Infos from "./components/info";
import EditModal from "./components/editModal";
import accessPage from "helper/functios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function CategoryDetails() {
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const url = "api/admin/fetch_one";
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [modals, setModals] = useState({
    edit: false,
  });

  const fetchCategory = () => {
    dispatch1(handler(true));
    fetchApi(url, { collaction: "cat", id, page: currentPage }, "post").then((res) => {
      if (res?.status_code === 200) {
        console.log(res?.Data[0]);
        dispatch1(handler(false));

        setAllData(res?.Data[0]);
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  useEffect(() => {
    fetchCategory();
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={2} mb={3}>
        <Grid spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Infos title="Category details " info={allData} fetchData={fetchCategory} />
          </Grid>
        </Grid>
      </SoftBox>

      {modals.edit && (
        <EditModal
          closeModal={() => setModals((prev) => ({ ...prev, edit: false }))}
          fetchData={fetchUser}
          info={allData}
          id={id}
        />
      )}
    </DashboardLayout>
  );
}

export default CategoryDetails;
