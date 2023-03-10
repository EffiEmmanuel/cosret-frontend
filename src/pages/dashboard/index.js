import DashboardHome from "@/components/DasboardHome";
import Dashboard from "@/components/Dashboard";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardOverview() {
  //   Protect Dashboard page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("token");
      if (!token) {
        Router.push("/login");
        //   setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/verifyToken`, {
          token,
        })
        .then((res) => {
          console.log("RESPONSE:", res.data);
          setIsUserLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          Router.push("/login");
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <>
      <ToastContainer />
      {isUserLoggedIn && (
        <Dashboard>
          <div></div>
          <DashboardHome />
        </Dashboard>
      )}
    </>
  );
}

export default DashboardOverview;
