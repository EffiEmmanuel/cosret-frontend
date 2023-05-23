import Image from "next/image";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

// React time ago configs
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import empty from "../../../../public/images/empty.png";
import Modal from "react-modal";
import AssignEngineerForm from "@/forms/Admin/AssignEngineerForm";
import { AdminContext } from "../AdminDashboard";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function AdminEngineers(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const { fetchEngineers, fetchProject, fetchusers, engineers, setEngineers } =
    useContext(AdminContext);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // SEARCH STATE
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  useEffect(() => {
    if (search !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  //   ACTIONS
  async function deleteEngineer(engineer) {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/engineers/${engineer?._id}`
      )
      .then((res) => {
        console.log("DELETE UR RES:", res.data);
        setEngineers(res.data.data);
      })
      .catch((err) => {
        console.log("DELETE UR ERR:", err);
      });
  }

  return (
    <>
      <div>
        {/* OVERVIEW */}
        <div className="mt-20">
          <div>
            <div className="flex justify-between align-middle lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
              <h1 className="text-xl font-bold my-auto">
                Engineers - {engineers?.length}
              </h1>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                  const result = engineers?.filter((engineer) =>
                    engineer?.email?.includes(search)
                  );
                  setSearchResults(result);
                }}
                placeholder="Search by email"
                className="my-auto w-full md:w-1/3 h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              />
            </div>
            {/* OTHER DETAILS ABOUT PROJECT */}
            <div className="mt-10">
              {/* RequirementCard */}
              <div className="w-full overflow-x-scroll lg:overflow-hidden">
                <div className="flex justify-between gap-x-10 min-w-[750px]">
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    First Name
                  </span>
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Last Name
                  </span>
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Email
                  </span>
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Actions
                  </span>
                </div>

                {engineers?.length === 0 && (
                  <div className="w-full mx-auto mt-10">
                    <Image
                      src={empty}
                      alt="Nothing here"
                      className="mx-auto"
                      width={150}
                    />
                    <h3 className="text-center">
                      Hang tight, no engineers on COSRET just yet.
                    </h3>
                  </div>
                )}

                {isSearching && searchResults?.length === 0 && (
                  <div className="w-full mx-auto mt-10">
                    <Image
                      src={empty}
                      alt="Nothing here"
                      className="mx-auto"
                      width={150}
                    />
                    <h3 className="text-center">
                      No emails match your search.
                    </h3>
                  </div>
                )}

                {!isSearching || search === ""
                  ? engineers?.map((engineer) => (
                      <div
                        // onClick={() => {
                        //   setCurrentItem(engineer);
                        //   //   fetchProject(project._id);
                        //   //   fetchEngineers();
                        //   //   setIsModalOpen(true);
                        // }}
                        key={engineer._id}
                        className="flex gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                      >
                        <span className="text-sm w-[187px]">
                          {engineer.firstName}
                        </span>
                        <span className="text-sm w-[187px]">
                          {engineer.lastName}
                        </span>
                        <span className="text-sm w-[187px]">
                          {engineer.email}
                        </span>
                        <span className="text-sm w-[187px]">
                          <button
                            onClick={() => deleteEngineer(engineer)}
                            className="ml-5"
                          >
                            <FaTrashAlt size={14} className="text-red-500" />
                          </button>
                        </span>
                      </div>
                    ))
                  : null}

                {isSearching
                  ? searchResults?.map((engineer) => (
                      <div
                        // onClick={() => {
                        //   setCurrentItem(engineer);
                        // }}
                        key={engineer._id}
                        className="flex gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                      >
                        <span className="text-sm w-[187px]">
                          {engineer.firstName}
                        </span>
                        <span className="text-sm w-[187px]">
                          {engineer.lastName}
                        </span>
                        <span className="text-sm w-[187px]">
                          {engineer.email}
                        </span>
                        <span className="text-sm w-[187px]">
                          <button
                            onClick={() => deleteEngineer(engineer)}
                            className="ml-5"
                          >
                            <FaTrashAlt size={14} className="text-red-500" />
                          </button>
                        </span>
                      </div>
                    ))
                  : null}

                <ol className="mt-5 w-[750px] max-w-[750px]"></ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
