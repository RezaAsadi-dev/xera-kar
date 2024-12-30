import React, { useEffect, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import AddNotifForm from "./AddNotifForm";
import accessPage from "helper/functios";
import { useLocation, useNavigate } from "react-router-dom";

function AddNotif() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const type = state?.type;

  const textMapping = useMemo(() => ({
    user: "Users",
    Professionals: "Professionals"
  }), []);

  const text = textMapping[type] || ""; 

  useEffect(() => {
    if (accessPage("Notifications", "add")) {
      navigate("/inaccessibility");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ overflow: "auto", width: "100%", maxWidth: "700px", margin: "auto" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6"> Notifications info  {text}</SoftTypography>
            </SoftBox>
            <AddNotifForm type={type} />
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default AddNotif;
