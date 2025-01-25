import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.css";
import DeleteModal from "./component/deleteModal";
import Options from "./component/options";
import { fetchApi } from "api";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lotties from "layouts/noData/Lotties";
import LengthNumber from "components/lengthNumber";

function Managers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const managersUrl = "api/admin/fetch";
  const [data, setData] = useState([]);
  const [delID, setDelID] = useState(null);
  const [modals, setModals] = useState({
    edit: false,
    delete: false,
    add: false,
  });

  const handleChange = (id) => {
    setDelID(id);
    setModals({ ...modals, delete: true });
  };

  const fetchData = () => {
    dispatch(handler(true));
    fetchApi(
      managersUrl,
      {
        collaction: "admin",
        query: { type: "operator" },
        page: 1,
      },
      "post"
    ).then((res) => {
      dispatch(handler(false));
      if (res.status_code === 200) {
        setData(res);
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardLayout>
        <DashboardNavbar />

        <SoftBox py={3} className="flex-grow">
          <SoftBox mb={3}>
            <Card style={{ minHeight: "700px" }}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <LengthNumber title=" Managers: " number={data?.count} />
                <SoftButton
                  variant="outlined"
                  color="mainColor"
                  size="small"
                  className="left-4 text-xs"
                  onClick={() => navigate("/managers/addManagers")}
                >
                  Add manager
                </SoftButton>
              </SoftBox>
              <SoftBox
                style={{ overflow: "auto" }}
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
                        <th>row</th>
                        <th> User Name </th>
                        <th> Email </th>
                        <th> Phone number </th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data?.map((item, index) => (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>
                          <td>{item?.user}</td>
                          <td>{item?.email ? item?.email : "--------"}</td>
                          <td>{item?.phoneNumber ? item?.phoneNumber : "--------"}</td>
                          <td>
                            <Options id={item?._id} openModal={() => handleChange(item?._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Lotties />
                )}
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>

        {modals.delete && (
          <DeleteModal
            closeModal={() => setModals({ ...modals, delete: false })}
            fetchData={fetchData}
            id={delID}
          />
        )}

        <div className="mt-auto">
          <Card className="p-[15px]">
            <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
              <span>
                © All rights of this site belong to XeraKar company. Any copying is prosecuted.
              </span>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Managers;
