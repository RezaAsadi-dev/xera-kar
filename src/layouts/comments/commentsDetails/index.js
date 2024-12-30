import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect } from "react";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../../redux/loaderSlice";
import Infos from "./components/info";
import EditModal from "./components/editModal";
import accessPage from "helper/functios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function CommentsDetails() {
  const navigate = useNavigate();
  const dispatch1 = useDispatch();
  const url = "v1/api/admin/user/fetch_one";
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
   const [modals, setModals] = useState({
    edit: false,
    chooseRepresentative: false,
    chooseConsultant: false,
  });

  const fetchUser = () => {
    dispatch1(handler(true));
    fetchApi(url, { id: id }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
 
        setAllData(res?.data);
 
      } else {
        dispatch1(handler(false));
        toast.error("Something went wrong!");
      }
    });
  };
  useEffect(() => {
    fetchUser();
    console.log(allData)
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      {/* <Header info={allData} allModal={modals} modal={setModals} /> */}
      <DashboardNavbar />
      <SoftBox mt={2} mb={3}>
        <Grid  spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            
            <Infos title="Comment details " info={allData} />
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

export default CommentsDetails;
