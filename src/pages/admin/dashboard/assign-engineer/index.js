import AdminAssignEngineer from "@/components/Admin/AdminAssignEngineer";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

function AssignEngineer() {
  return (
    <AdminDashboard>
      <div></div>
      <AdminAssignEngineer />
    </AdminDashboard>
  );
}

export default AssignEngineer;
