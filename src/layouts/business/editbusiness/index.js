import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import accessPage from "helper/functios";
import EditBusinessForm from "./editBusinessForm";

function EditBusiness() {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessPage("users", "edit")) {
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
                Edit Business 
              </SoftTypography>
            </SoftBox>
              <EditBusinessForm/>
          </Card>
        </SoftBox>
        <Card className="p-[15px]">
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

export default EditBusiness;
