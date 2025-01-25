import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "./components/Header";
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
import Card from "@mui/material/Card";

function UsersDetails() {
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const url = "api/admin/fetch_one";
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
  const [modals, setModals] = useState({
    edit: false,
  });

  const fetchUser = () => {
    dispatch1(handler(true));
    fetchApi(url,{
       collaction:"user",
       id: id ,
      },
       "post"
      ).then((res) => {
      if (res?.status_code === 200) {
        setAllData(res?.Data);
      }
      else{
        toast.error("Something went wrong!");
      }
    })
    .catch(() => {
      toast.error("Failed to fetch user data.");
    })
    .finally(() => {
      dispatch1(handler(false));
    });
};
  
  useEffect(() => {
    fetchUser();
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  useEffect(() => {
    console.log(allData);
  }, [allData]);

  return (
    <DashboardLayout>
      <Header info={allData} allModal={modals} modal={setModals} />
      {/* <DashboardNavbar /> */}

      <SoftBox mt={2} mb={3}>
        <Grid item xs={12} md={6} xl={4}>
          <Infos info={allData} />
        </Grid>
        {/* <Grid item xs={12} md={6} xl={4}>
            <Transactions info={allData && allData}/>
          </Grid> */}
      </SoftBox>

      {modals.edit && (
        <EditModal
          closeModal={() => setModals((prev) => ({ ...prev, edit: false }))}
          fetchData={fetchUser}
          info={allData}
          id={id}
        />
      )}
      <Card className="mt-[100px] p-[15px]">
        <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
          <span>
            © All rights of this site belong to XeraKar company. Any copying is prosecuted.
          </span>
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default UsersDetails;
