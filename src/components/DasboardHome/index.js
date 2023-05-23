import ValueCard from "../ValueCard";
import effi from "../../../public/images/effi.jpg";
import { useContext } from "react";
import { UserContext } from "../Dashboard";

export default function DashboardHome() {
  const { user, projects } = useContext(UserContext);

  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Recent Projects</h1>

        <div className="flex flex-wrap gap-10">
          {projects?.length === 0 && (
            <h2 className="mt-4">You do not have any projects yet...</h2>
          )}

          {projects?.map((project) => (
            <div key={project._id}>
              <ValueCard
                // image={effi}
                title={project?.name}
                description={project?.description}
                slug={project.slug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
