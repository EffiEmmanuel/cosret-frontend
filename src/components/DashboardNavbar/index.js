import DashboardNav from "@/components/DashboardNav";
import { UserContext } from "@/pages/dashboard";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function DashboardNavbar() {
  const [isNavHidden, setIsNavHidden] = useState(true);

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

      <DashboardNav isNavHidden={isNavHidden} setIsNavHidden={setIsNavHidden} />
    </>
  );
}
