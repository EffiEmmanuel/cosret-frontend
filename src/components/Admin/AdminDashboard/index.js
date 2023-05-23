import { createContext, useEffect, useState } from "react";

import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AdminDashboardNavbar from "../AdminDashboardNavbar";
import AdminDahboardTopBar from "../AdminDashboardTopBar";

// Estabishing Connection with socket.io
// const socket = io.connect("http://localhost:3001");

// Creating a user context to manage state
export const AdminContext = createContext();

function AdminDashboard(props) {
  const [admin, setAdmin] = useState();
  const [statistics, setStatistics] = useState();
  const [engineers, setEngineers] = useState();
  const [users, setUsers] = useState();
  const [projects, setProjects] = useState();
  const [projectsPendingAssignment, setProjectsPendingAssignment] = useState(
    []
  );

  //   Current page
  const [currentPage, setCurrectPage] = useState("home");

  function setTheCurrentPage(page) {
    setCurrectPage(page);
  }

  //   Protect page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  //   FUNCTIONS
  async function getStatistics() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/stats/get-statistics`)
      .then((res) => {
        console.log("ADMIN STATS:", res.data.data);
        setStatistics(res.data.data);
      })
      .catch((err) => {
        console.log("ADMIN STATS ERROR:", err);
      });
  }

  async function fetchProject(_id) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/${_id}`)
      .then((res) => {
        console.log("PBiD:", res.data);
      })
      .catch((err) => {
        console.log("PBiD Error:", err);
      });
  }

  async function fetchEngineers() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/engineers`)
      .then((res) => {
        console.log("ENGINEERS:", res.data.data);
        setEngineers(res.data.data);
      })
      .catch((err) => {
        console.log("ENGINEERS Error:", err);
      });
  }

  async function fetchUsers() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`)
      .then((res) => {
        console.log("USERS:", res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log("ENGINEERS Error:", err);
      });
  }

  async function fetchProjects() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/projects`)
      .then((res) => {
        console.log("PROJECTS:", res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.log("ENGINEERS Error:", err);
      });
  }

  async function fetchProjectsPendingAssignment() {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/projects/pending-assignment`
      )
      .then((res) => {
        console.log("PPA:", res.data.projects);
        setProjectsPendingAssignment(res.data.projects);
      })
      .catch((err) => {
        console.log("PPA:", err);
      });
  }

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("admin-token");
      if (!token) {
        Router.push("/admin");
        setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/verifyToken`, {
          token,
        })
        .then(async (res) => {
          console.log("RESPONSE HERE:", res.data);
          setIsAdminLoggedIn(true);
          setIsLoading(false);
          return axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/${res.data.data._id}`
            )
            .then((res) => {
              console.log("SECOND RES:", res.data);
              setAdmin(res.data.data);
            })
            .catch((err) => {
              console.log("ERROR HERE:", err);
            });
        })
        .catch((err) => {
          //   toast.error(err.response.data.message);
          console.log("ERROR THERE:", err);
          Router.push("/admin");
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  useEffect(() => {
    getStatistics();
    fetchProjectsPendingAssignment();
    fetchEngineers()
    fetchUsers()
    fetchProjects()
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        currentPage,
        statistics,
        engineers,
        users,
        projects,
        projectsPendingAssignment,
        fetchProjectsPendingAssignment,
        fetchProject,
        setTheCurrentPage,
        fetchEngineers,
        setUsers,
        setEngineers,
        setProjects
      }}
    >
      <ToastContainer />
      <AdminDashboardNavbar />
      {/* BODY */}
      <div className="p-10 lg:pl-[25%] scrollbar-thin">
        <AdminDahboardTopBar />
        {...props.children}
      </div>
    </AdminContext.Provider>
  );
}

export default AdminDashboard;
