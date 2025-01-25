import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import ProfileInfoCard from "examples/Cards/userInfoCard/ProfileInfoCard";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import Infos from "./info";
import accessPage from "helper/functios";
import Card from "@mui/material/Card";
import EditModal from "layouts/users/usersDetails/components/editModal";
import Header from "./components/Header";

function ProDetails() {
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const professionalUrl = "/api/admin/fetch_one";
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
  const [modals, setModals] = useState({
    edit: false,
    chooseRepresentative: false,
    chooseConsultant: false,
  });

  const [data, setData] = useState({});
  const getpro = () => {
    
    
    dispatch1(handler(true));
    fetchApi(professionalUrl, { collaction: "company", id }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        console.log(res);

        setAllData(res?.Data);

        // setnumber(res?.count);
        // setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  }
  // console.log(allData);
  
  useEffect(() => {
    getpro()
  }, [])

  return (
    <DashboardLayout>
      <Header info={allData} allModal={modals} modal={setModals} />
      <SoftBox mt={2} mb={3}>
        <Grid item xs={12} md={6} xl={4}>
          <Infos info={allData} />
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
      <Card className="mt-[35px] p-[15px]">
        <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
          <span>
            © All rights of this site belong to XeraKar company. Any copying is prosecuted.
          </span>
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default ProDetails;
