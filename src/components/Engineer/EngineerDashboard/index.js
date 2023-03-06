import EngineerDashboardNavbar from "../EngineerDashboardNavbar";
import { createContext, useEffect, useState } from "react";

import { io } from "socket.io-client";
import EngineerDahboardTopBar from "../EngineerDashboardTopBar";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

// Estabishing Connection with socket.io
// const socket = io.connect("http://localhost:3001");

// Creating a user context to manage state
export const EngineerContext = createContext();

function EngineerDashboard(props) {
  const [engineer, setEngineer] = useState();

  //   Current page
  const [currentPage, setCurrectPage] = useState("home");

  function setTheCurrentPage(page) {
    setCurrectPage(page);
  }

  //   Protect page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isEngineerLoggedIn, setIsEngineerLoggedIn] = useState(false);

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("engineer-token");
      if (!token) {
        Router.push("/login");
        setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/engineers/verifyToken`, {
          token,
        })
        .then(async (res) => {
          console.log("RESPONSE HERE:", res.data);
          setIsEngineerLoggedIn(true);
          setIsLoading(false);
          return axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL_API}/engineers/${res.data.data._id}`
            )
            .then((res) => {
              console.log("SECOND RES:", res.data);
              setEngineer(res.data.data);
            })
            .catch((err) => {
              console.log("ERROR HERE:", err);
            });
        })
        .catch((err) => {
          //   toast.error(err.response.data.message);
          console.log("ERROR THERE:", err);
          //   Router.push("/login");
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <EngineerContext.Provider
      value={{ engineer, currentPage, setTheCurrentPage }}
    >
      <ToastContainer />
      <EngineerDashboardNavbar />
      {/* BODY */}
      <div className="p-10 lg:pl-[25%] scrollbar-thin">
        <EngineerDahboardTopBar />
        {...props.children}
      </div>
    </EngineerContext.Provider>
  );
}

export default EngineerDashboard;
