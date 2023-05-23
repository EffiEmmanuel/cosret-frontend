import AdminProjects from "@/components/Admin/AdminProjects";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

function Projects() {
  return (
    <AdminDashboard>
      <div></div>
      <AdminProjects />
    </AdminDashboard>
  );
}

export default Projects;
