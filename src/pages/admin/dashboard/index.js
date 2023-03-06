import AdminDashboard from "@/components/Admin/AdminDashboard";
import AdminDashboardHome from "@/components/Admin/AdminDashboardHome";
import EngineerDashboard from "@/components/Engineer/EngineerDashboard";
import EngineerDashboardHome from "@/components/Engineer/EngineerDashboardHome";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboardOverview() {
  //   Protect Dashboard page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        Router.push("/admin");
        //   setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/verifyToken`, {
          token,
        })
        .then((res) => {
          console.log("RESPONSE:", res.data);
          setIsAdminLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          Router.push("/admin");
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <>
      <ToastContainer />
      {isAdminLoggedIn && (
        <AdminDashboard>
          <div></div>
          <AdminDashboardHome />
        </AdminDashboard>
      )}
    </>
  );
}

export default AdminDashboardOverview;
