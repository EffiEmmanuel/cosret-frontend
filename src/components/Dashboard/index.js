import DashboardNavbar from "@/components/DashboardNavbar";
import { createContext, useEffect, useState } from "react";

import { io } from "socket.io-client";
import DahboardTopBar from "../DashboardTopBar";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

// Estabishing Connection with socket.io
// const socket = io.connect("http://localhost:3001");

// Creating a user context to manage state
export const UserContext = createContext();

function Dashboard(props) {
  const [user, setUser] = useState();

  //   Current page
  const [currentPage, setCurrectPage] = useState("home");

  function setTheCurrentPage(page) {
    setCurrectPage(page);
  }

  //   Protect page
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
          return axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${res.data.data._id}`
            )
            .then((res) => {
              //   console.log("SECOND RES:", res.data);
              setUser(res.data.data);
            })
            .catch((err) => {});
        })
        .catch((err) => {
          //   toast.error(err.response.data.message);
          Router.push("/login");
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, currentPage, setTheCurrentPage }}>
      <ToastContainer />
      <DashboardNavbar />
      {/* BODY */}
      <div className="p-10 lg:pl-[25%] scrollbar-thin">
        <DahboardTopBar />
        {...props.children}
      </div>
    </UserContext.Provider>
  );
}

export default Dashboard;
