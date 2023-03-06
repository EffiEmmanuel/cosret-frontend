import { useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { AdminContext } from "../AdminDashboard";

export default function AdminDahboardTopBar(props) {
  const { admin } = useContext(AdminContext);
  return (
    <div className="border-b-[.5px] pb-3 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold max-w-sm">Welcome back, admin!</h1>
        <p className="text-gray-500 font-bold text-sm uppercase">
          {admin?.username}
        </p>
        <p className="text-sm mt-2">
          Here is an overview of all recent activity on Cosret
        </p>
      </div>

      <div>
        <div className="bg-red-500 h-2 w-2 rounded-full relative top-2 left-4"></div>
        <FaRegBell size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}
