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

export default function AdminAssignEngineer(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const {
    engineers,
    fetchEngineers,
    fetchProject,
    fetchProjectsPendingAssignment,
    projectsPendingAssignment,
  } = useContext(AdminContext);

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
  return (
    <>
      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="bg-red-500 max-w-lg mx-auto mt-[120px]"
        >
          <div className="h-[400px] shadow-lg p-14 bg-white text-center">
            <h2 className="font-semibold text-lg">Assign Engineer</h2>
            <div className="mt-5 text-left">
              <p className="mt-3">
                <strong>Project Title</strong>: {currentItem?.name}
              </p>
              <p className="mt-3">
                <strong>Project Owner</strong>: {currentItem?.owner?.lastName}{" "}
                {currentItem?.owner?.firstName}
              </p>
              <p className="mt-3">
                <strong>Time Created</strong>:{" "}
                <ReactTimeAgo date={currentItem?.createdAt} locale="en-US" />
              </p>
            </div>
            <div className="mt-5 text-left">
              <AssignEngineerForm
                fetchProjectsPendingAssignment={fetchProjectsPendingAssignment}
                project={currentItem}
                engineers={engineers}
              />
            </div>
          </div>
        </Modal>
        {/* OVERVIEW */}
        <div className="mt-20">
          <div>
            <div className="flex justify-between align-middle lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
              <h1 className="text-xl font-bold my-auto">
                Projects Pending Assignment -{" "}
                {projectsPendingAssignment?.length}
              </h1>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsSearching(true);
                  const result = projectsPendingAssignment?.filter((project) =>
                    project?.name?.includes(search)
                  );
                  setSearchResults(result);
                }}
                placeholder="Search by project name"
                className="my-auto w-full md:w-1/3 h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              />
            </div>
            {/* OTHER DETAILS ABOUT PROJECT */}
            <div className="mt-10">
              {/* RequirementCard */}
              <div className="w-full overflow-x-scroll lg:overflow-hidden">
                <div className="flex justify-between gap-x-10 min-w-[750px]">
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Title
                  </span>
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Owner
                  </span>
                  <span className="text-xs w-[187px] text-gray-400 uppercase">
                    Time Created
                  </span>
                </div>

                {projectsPendingAssignment?.length === 0 && (
                  <div className="w-full mx-auto mt-10">
                    <Image
                      src={empty}
                      alt="Nothing here"
                      className="mx-auto"
                      width={150}
                    />
                    <h3 className="text-center">
                      Nothing here, all projects have been assigned a
                      requirement engineer.
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
                      No projects match your search.
                    </h3>
                  </div>
                )}

                {!isSearching || search === ""
                  ? projectsPendingAssignment?.map((project) => (
                      <div
                        onClick={() => {
                          setCurrentItem(project);
                          fetchProject(project._id);
                          fetchEngineers();
                          setIsModalOpen(true);
                        }}
                        key={project._id}
                        className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                      >
                        <span className="text-sm w-[187px]">
                          {project.name}
                        </span>
                        <span className="text-sm w-[187px]">
                          {project.owner.lastName} {project.owner.firstName}
                        </span>
                        <span className="text-sm w-[187px]">
                          <ReactTimeAgo
                            date={project.createdAt}
                            locale="en-US"
                          />
                        </span>
                      </div>
                    ))
                  : null}

                {isSearching
                  ? searchResults?.map((project) => (
                      <div
                        onClick={() => {
                          setCurrentItem(project);
                          fetchProject(project._id);
                          fetchEngineers();
                          setIsModalOpen(true);
                        }}
                        key={project._id}
                        className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                      >
                        <span className="text-sm w-[187px]">
                          {project.name}
                        </span>
                        <span className="text-sm w-[187px]">
                          {project.owner.lastName} {project.owner.firstName}
                        </span>
                        <span className="text-sm w-[187px]">
                          <ReactTimeAgo
                            date={project.createdAt}
                            locale="en-US"
                          />
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
