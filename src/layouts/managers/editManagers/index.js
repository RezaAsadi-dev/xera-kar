import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import EditManagersForm from "./component";
import { useParams } from "react-router-dom";
import accessPage from "helper/functios";

function EditManagers() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id && accessPage("managars", "edit")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ overflow: "auto" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">  Edit Managar  </SoftTypography>
            </SoftBox>
            <EditManagersForm />
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default EditManagers;
