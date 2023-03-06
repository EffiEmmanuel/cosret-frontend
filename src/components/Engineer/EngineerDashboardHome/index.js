import ValueCard from "@/components/ValueCard";
import { useContext } from "react";
import { FaBell, FaRegBell, FaRegBookmark } from "react-icons/fa";
import effi from "../../../../public/images/effi.jpg";
import { EngineerContext } from "../EngineerDashboard";

export default function EngineerDashboardHome() {
  const { engineer } = useContext(EngineerContext);
  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Recent Projects</h1>

        <div className="flex flex-wrap gap-10">
          {engineer?.projectsAssignedTo.length === 0 && (
            <h2 className="mt-4">
              You have not been assigned any project yet...
            </h2>
          )}

          {engineer?.projectsAssignedTo.map((project) => (
            <div key={project._id}>
              <ValueCard
                image={effi}
                title="Babcock UMIS"
                description="This project is for Babcock's university management system."
              />
            </div>
          ))}
          {/* <ValueCard
            image={effi}
            title="Babcock UMIS"
            description="This project is for Babcock's university management system."
          />
          <ValueCard
            image={effi}
            title="BluPay Finance"
            description="This project is for Babcock's university management system."
          /> */}
        </div>
      </section>
    </>
  );
}
