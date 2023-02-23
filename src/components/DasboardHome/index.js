import ValueCard from "../ValueCard";
import { FaBell, FaRegBell, FaRegBookmark } from "react-icons/fa";
import effi from "../../../public/images/effi.jpg";
import Dashboard from "@/pages/dashboard";

export default function DashboardHome() {
  return (
    <>
      <div className="border-b-[.5px] pb-3 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold max-w-sm">
            Welcome back, Effi Emmanuel!
          </h1>
          <p className="text-sm mt-2">
            Here is an overview of your recent activity
          </p>
        </div>

        <div>
          <div className="bg-red-500 h-2 w-2 rounded-full relative top-2 left-4"></div>
          <FaRegBell size={20} className="cursor-pointer" />
        </div>
      </div>

      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Recent Projects</h1>

        <div className="flex flex-wrap gap-10">
          <ValueCard
            image={effi}
            title="Babcock UMIS"
            description="This project is for Babcock's university management system."
          />
          <ValueCard
            image={effi}
            title="BluPay Finance"
            description="This project is for Babcock's university management system."
          />
        </div>
      </section>
    </>
  );
}
