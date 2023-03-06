import CreateNewProjectForm from "@/forms/CreateNewProjectForm";

export default function CreateNewProject() {
  return (
    <>
      <div className="mt-20 border-b-[.5px] pb-3 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold max-w-sm">Create New Project</h1>
          <p className="text-sm mt-2">The start of something beautiful!</p>
        </div>
      </div>

      {/* LATEST ACTIVITY */}
      <section className="mt-10">
        <CreateNewProjectForm />
      </section>
    </>
  );
}
