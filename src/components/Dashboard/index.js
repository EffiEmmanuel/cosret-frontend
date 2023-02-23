import DashboardNavbar from "@/components/DashboardNavbar";
import { createContext, useState } from "react";
import CreateNewProject from "../CreateNewProject";
import DashboardHome from "../DasboardHome";

import { io } from "socket.io-client";

// Estabishing Connection with socket.io
const socket = io.connect("http://localhost:3001");

// Creating a user context to manage state
export const UserContext = createContext();

function Dashboard(props) {
  const [user, setUser] = useState();

  //   Current page
  const [currentPage, setCurrectPage] = useState("home");

  function setTheCurrentPage(page) {
    setCurrectPage(page);
  }

  return (
    <UserContext.Provider value={{ user, currentPage, setTheCurrentPage }}>
      <DashboardNavbar />
      {/* BODY */}
      <div className="p-10 lg:pl-[25%]">{...props.children}</div>
    </UserContext.Provider>
  );
}

export default Dashboard;
