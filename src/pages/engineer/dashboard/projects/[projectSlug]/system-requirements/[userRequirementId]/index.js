import DashboardHome from "@/components/DasboardHome";
import Dashboard from "@/components/Dashboard";
import EngineerDashboard from "@/components/Engineer/EngineerDashboard";
import EngineerSystemRequirements from "@/components/Engineer/EngineerProjectDetail/EngineerSystemRequirements";
import ProjectDetail from "@/components/ProjectDetail";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProjectDetails() {
  const Router = useRouter();
  const { projectSlug } = Router.query;
  const [project, setProject] = useState();

  // Make API call to get project by id
  useEffect(() => {
    async function getProjectBySlug() {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/slug/${projectSlug}`
        )
        .then((res) => {
          console.log("res.data:", res.data);
          setProject(res.data.data);
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    }

    getProjectBySlug();
    console.log("PROJECT SLUG:", projectSlug);
  }, [projectSlug]);

  return (
    <EngineerDashboard>
      <div></div>
      <EngineerSystemRequirements project={project} />
    </EngineerDashboard>
  );
}

export default ProjectDetails;
