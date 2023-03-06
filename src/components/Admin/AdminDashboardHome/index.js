import StatCard from "@/components/StatCard";
import ValueCard from "@/components/ValueCard";
import { useContext, useEffect, useState } from "react";
import { FaCode, FaProjectDiagram, FaUserAlt } from "react-icons/fa";
import effi from "../../../../public/images/effi.jpg";
import { AdminContext } from "../AdminDashboard";

export default function AdminDashboardHome() {
  const { statistics } = useContext(AdminContext);

  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Statistics</h1>

        <div className="flex flex-wrap gap-20 mt-12">
          <StatCard
            icon={<FaUserAlt size={25} />}
            title={statistics?.users}
            description="Users"
          />
          <StatCard
            icon={<FaCode size={25} />}
            title={statistics?.engineers}
            description="Engineers"
          />
          <StatCard
            icon={<FaProjectDiagram size={25} />}
            title={statistics?.projects}
            description="Total Projects"
          />
        </div>

        {/* TO-DO: Add recent projects without an engineer (engineerAssigned: false) here */}
      </section>
    </>
  );
}
