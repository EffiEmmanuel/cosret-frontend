import { useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { EngineerContext } from "../EngineerDashboard";

export default function EngineerDahboardTopBar(props) {
  const { engineer } = useContext(EngineerContext);
  return (
    <div className="border-b-[.5px] pb-3 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold max-w-sm">
          Welcome back, {engineer?.lastName} {engineer?.firstName}!
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
  );
}
