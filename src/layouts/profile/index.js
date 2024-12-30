import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/userInfoCard/ProfileInfoCard";
import ManagersCardInfo from "examples/Cards/userInfoCard/ManagersCardInfo";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import EditModal from "./components/editModal";
function Profile() {
  const dispatch = useDispatch();
  const profileUrl = "v1/api/admin/auth/get_profile";
  const [allData, setAllData] = useState();
  const [modals, setModals] = useState(false);

  const fetchProfile = () => {
    dispatch(handler(true));
    fetchApi(profileUrl).then((res) => {
      if (res?.status_code === 200) {
        dispatch(handler(false));
        setAllData(res);
      } else {
        dispatch(handler(false));
        toast.error("Something went wrong! Please try again later");
      }
    });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const id = allData?.data?._id;
  return (
    <DashboardLayout>
      <Header info={allData?.data} modal={setModals} />
      <SoftBox mt={4} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="User profile"
              info={allData?.data}
              action={{ tooltip: "Edit info " }}
            />
           
          </Grid>
          <Grid item xs={12} md={6} xl={8}>
            <ManagersCardInfo title="permission levels" permissions={allData?.data?.access} />
          </Grid>
        </Grid>
      </SoftBox>
      {modals && (
        <EditModal
          closeModal={() => setModals(false)}
          fetchData={fetchProfile}
          info={allData?.data}
          id={id}
        />
      )}
    </DashboardLayout>
  );
}

export default Profile;
