import DashboardNav from "@/components/DashboardNav";
import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Dashboard";

export default function DashboardNavbar() {
  const [isNavHidden, setIsNavHidden] = useState(true);

  // Get user from user context
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Nabvar */}
      <div className="bg-black lg:hidden w-full flex justify-between px-10 py-7">
        <h2 className="font-bold text-white text-xl">COSRET</h2>
        <div className="lg:hidden">
          {isNavHidden ? (
            <FaBars
              size={25}
              color="#fff"
              className="cursor-pointer"
              onClick={() => setIsNavHidden(false)}
            />
          ) : (
            <FaTimes
              size={25}
              color="#fff"
              className="cursor-pointer"
              onClick={() => setIsNavHidden(true)}
            />
          )}
        </div>
      </div>

      <DashboardNav
        user={user}
        isNavHidden={isNavHidden}
        setIsNavHidden={setIsNavHidden}
      />
    </>
  );
}
