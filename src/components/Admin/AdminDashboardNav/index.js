import Link from "next/link";
import Image from "next/image";
import {
  FaBug,
  FaClock,
  FaCode,
  FaConnectdevelop,
  FaHeadset,
  FaHome,
  FaHourglass,
  FaLaptopMedical,
  FaNetworkWired,
  FaPlus,
  FaProjectDiagram,
  FaRegClock,
  FaRegHourglass,
  FaSignOutAlt,
  FaStopwatch,
  FaTimesCircle,
  FaUserAlt,
} from "react-icons/fa";
import effi from "../../../../public/images/effi.jpg";
import { useContext } from "react";
import { UserContext } from "@/pages/user/dashboard";

export default function AdminDashboardNav({ isNavHidden, admin }) {
  return (
    <nav
      className={`bg-cosretBlue-300 md:w-1/4 lg:w-1/5 z-10 fixed w-2/4 min-h-screen lg:block text-black px-10 pt-7 top-0 left-0 ${
        isNavHidden ? "hidden" : "block"
      }`}
    >
      <h2 className="font-bold text-xl">COSRET</h2>
      <h2 className="font-semibold text-sm">Admin</h2>

      <ul className="mt-14">
        {/* CATEGORY */}
        <li className="my-11">
          <p className="text-xs text-gray-500 uppercase">Overview</p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link href="/admin/dashboard" className="flex align-middle gap-2">
                <FaHome size={16} className="my-auto" />
                <span className="my-auto text-sm">Home</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* CATEGORY */}
        <li className="my-11">
          <p className="text-xs text-gray-500 uppercase">Management</p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7 mt-4">
              <Link
                href="/admin/dashboard/assign-engineer"
                className="flex align-middle gap-2"
              >
                <FaClock size={14} className="my-auto" />
                <span className="my-auto text-sm">Assign Engineer</span>
              </Link>
            </li>
            <li className="ml-7 mt-5">
              <Link
                href="/admin/dashboard/users"
                className="flex align-middle gap-2"
              >
                <FaUserAlt size={14} className="my-auto" />
                <span className="my-auto text-sm">Users</span>
              </Link>
            </li>
            <li className="ml-7 mt-5">
              <Link
                href="/admin/dashboard/engineers"
                className="flex align-middle gap-2"
              >
                <FaCode size={14} className="my-auto" />
                <span className="my-auto text-sm">Engineers</span>
              </Link>
            </li>
            <li className="ml-7 mt-5">
              <Link
                href="/admin/dashboard/projects"
                className="flex align-middle gap-2"
              >
                <FaProjectDiagram size={14} className="my-auto" />
                <span className="my-auto text-sm">Projects</span>
              </Link>
            </li>
            {/* <li className="ml-7">
              <Link
                href="/admin/dashboard/projects/create-new"
                className="flex align-middle mt-5 border-gray-400 rounded-md gap-4 border-dotted border-2 p-3"
              >
                <div className="my-auto">
                  <FaPlus size={16} className="text-gray-400" />
                </div>
                <span className="my-auto text-gray-400 text-sm">
                  Create new
                </span>
              </Link>
            </li> */}
          </ul>
        </li>

        {/* CATEGORY */}
        <li className="my-11">
          <p className="text-xs text-gray-500 uppercase">Help & Support</p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link href="/" className="flex align-middle gap-2">
                <FaHeadset size={16} className="my-auto" />
                <span className="my-auto text-sm">Support</span>
              </Link>
            </li>
            <li className="ml-7">
              <Link href="/" className="flex align-middle gap-2 mt-4">
                <FaBug size={16} className="my-auto" />
                <span className="my-auto text-sm">Report a problem</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CATEGORY */}
        <li className="my-11">
          <p className="text-xs text-gray-500 uppercase">Account</p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link href="/" className="flex align-middle gap-2 mt-4">
                <FaSignOutAlt size={16} className="my-auto" />
                <span className="my-auto">Log out</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
