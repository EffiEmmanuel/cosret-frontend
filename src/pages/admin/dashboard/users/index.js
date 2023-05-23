import AdminUsers from "@/components/Admin/AdminUsers";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  return (
    <AdminDashboard>
      <div></div>
      <AdminUsers />
    </AdminDashboard>
  );
}

export default Users;
