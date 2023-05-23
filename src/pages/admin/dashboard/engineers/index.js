import AdminEngineers from "@/components/Admin/AdminEngineers";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

function Engineers() {
  return (
    <AdminDashboard>
      <div></div>
      <AdminEngineers />
    </AdminDashboard>
  );
}

export default Engineers;
