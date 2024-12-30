import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import accessPage from "helper/functios";
import AddUserForm from "./adduserform";

function AddUser() {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessPage("users", "add")) {
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
              <SoftTypography variant="h6">
                Add User 
              </SoftTypography>
            </SoftBox>
              <AddUserForm/>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default AddUser;
