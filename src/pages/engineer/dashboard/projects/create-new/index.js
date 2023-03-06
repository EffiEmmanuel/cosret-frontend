import CreateNewProject from "@/components/CreateNewProject";
import Dashboard from "@/components/Dashboard";
import EngineerDashboard from "@/components/Engineer/EngineerDashboard";

export default function CreateNew() {
  return (
    <EngineerDashboard>
      <div></div>
      <CreateNewProject />
    </EngineerDashboard>
  );
}
