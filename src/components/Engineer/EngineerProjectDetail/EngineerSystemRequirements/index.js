import Image from "next/image";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaLink,
  FaPencilAlt,
  FaPlus,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import empty from "../../../../../public/images/empty.png";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import AddUserRequirementForm from "@/forms/AddUserRequirementForm";

// React time ago configs
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import axios from "axios";
import { useContext } from "react";
import { EngineerContext } from "../../EngineerDashboard";
import { useRouter } from "next/router";
import AddSystemRequirementForm from "@/forms/AddSystemRequirementForm";
import AddSNonFunctionalRequirementForm from "@/forms/AddNonFunctionalRequirementForm";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function EngineerSystemRequirements(props) {
  const Router = useRouter();
  const { userRequirementId, projectSlug } = Router.query;

  const [currentItem, setCurrentItem] = useState();
  const [project, setProject] = useState();

  const [userRequirement, setUserRequirement] = useState(
    props?.project?.userRequirements
  );

  const [systemRequirements, setSystemRequirements] = useState();

  const { engineer } = useContext(EngineerContext);
  const [isLoading, setIsLoading] = useState(false);

  //   Modal Configs
  const [isNFRModalOpen, setIsNFRModalOpen] = useState(false);
  const [isFRModalOpen, setIsFRModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  //   useEffect(() => {
  //     Modal.setAppElement("#appElement");
  //   }, []);
  function openNFRModal() {
    setIsNFRModalOpen(true);
  }
  function closeNFRModal() {
    setIsNFRModalOpen(false);
  }
  function openFRModal() {
    setIsFRModalOpen(true);
  }
  function closeFRModal() {
    setIsFRModalOpen(false);
  }
  //   TO-DO: REFACTOR CODE TO ENABLE SINGLE HANDLING OF MODALS
  function openDetailModal() {
    setIsDetailModalOpen(true);
  }
  function closeDetailModal() {
    setIsDetailModalOpen(false);
  }

  //   FUNCTION: Fetch System Requirements for the selected user requirement
  async function fetchSystemRequirements(userRequirementId) {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/${userRequirementId}/functional-requirements?userId=${user?._id}&projectId=${props?.project._id}`
      )
      .then((res) => {
        console.log("SR:", res.data.data);
        setSystemRequirements(res.data.data);
      })
      .catch((err) => {
        console.log("SR ERR:", err);
      });
  }

  //   SYSTEM REQUIREMENT DETAIL
  useEffect(() => {
    async function fetchUserRequirement() {
      setIsLoading(true);
      // Send API request here
      if (project?._id && project?.owner?._id) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/${userRequirementId}?projectId=${project?._id}&userId=${project?.owner?._id}`
          )
          .then((res) => {
            console.log("GET UR RES:", res.data);
            setUserRequirement(res.data.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("ADD UR ERROR:", err);
            toast.error(err.response.data.message);
            setIsLoading(false);
          });
      }
    }
    fetchUserRequirement();
  }, [project?._id, project?.owner?._id]);

  useEffect(() => {
    async function getProjectBySlug() {
      if (projectSlug) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/slug/${projectSlug}`
          )
          .then((res) => {
            console.log("res.data:", res.data);
            setProject(res.data.data);
            setSystemRequirements(res.data.data.systemRequirements);
          })
          .catch((err) => {
            console.log("ERROR:", err);
          });
      }
    }
    getProjectBySlug();
  }, [projectSlug]);

  //   ACTIONS
  async function deleteSystemRequirement(systemRequirementId) {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/functional-requirements/${systemRequirementId}?engineerId=${engineer?._id}&projectId=${props?.project._id}`
      )
      .then((res) => {
        console.log("DELETE SR RES:", res.data);
        setSystemRequirements(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("DELETE SR ERR:", err);
      });
  }
  async function deleteNonFunctionalRequirement(systemRequirementId) {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/non-functional-requirements/${systemRequirementId}?engineerId=${engineer?._id}&projectId=${props?.project._id}`
      )
      .then((res) => {
        console.log("DELETE SR RES:", res.data);
        // setSystemRequirements(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("DELETE SR ERR:", err);
      });
  }

  return (
    <>
      {/* ADD NON-FUNCTIONAL REQUIREMENT MODAL */}
      <Modal
        isOpen={isNFRModalOpen}
        onRequestClose={closeNFRModal}
        className="bg-red-500 max-w-lg mx-auto mt-[120px]"
      >
        <div className="h-[400px] shadow-lg p-14 bg-white text-center">
          <h2 className="font-semibold text-lg">
            Add Non-functional Requirement
          </h2>
          <h2 className="text-sm text-left mt-4">
            <h1 className="font-semibold">User Requirement:</h1>{" "}
            {userRequirement?.requirement}
          </h2>
          <AddSNonFunctionalRequirementForm
            userRequirementId={userRequirementId}
            systemRequirements={systemRequirements}
            setSystemRequirements={setSystemRequirements}
            project={props?.project}
          />
        </div>
      </Modal>
      {/* ADD FUNCTIONAL REQUIREMENT MODAL */}
      <Modal
        isOpen={isFRModalOpen}
        onRequestClose={closeFRModal}
        className="bg-red-500 max-w-lg mx-auto mt-[120px]"
      >
        <div className="h-[400px] shadow-lg p-14 bg-white text-center">
          <h2 className="font-semibold text-lg">Add Functional Requirement</h2>
          <h2 className="text-sm text-left mt-4">
            <h1 className="font-semibold">User Requirement:</h1>{" "}
            {userRequirement?.requirement}
          </h2>
          <AddSystemRequirementForm
            userRequirementId={userRequirementId}
            systemRequirements={systemRequirements}
            setSystemRequirements={setSystemRequirements}
            project={props?.project}
          />
        </div>
      </Modal>

      {/* USER REQUIREMENT DETAIL MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        className="bg-red-500 max-w-lg mx-auto mt-[120px]"
      >
        <div className="h-auto max-h-[450px] overflow-y-scroll shadow-lg p-14 bg-white text-center">
          <h2 className="font-semibold text-lg">User Requirement Details</h2>
          {/* <AddUserRequirementForm
            userRequirements={userRequirements}
            setUserRequirements={setUserRequirements}
            project={props?.project}
          /> */}
          <p className="text-sm mt-10 uppercase text-gray-400">Requirement:</p>
          <p className="text-sm mt-2">{currentItem?.requirement}</p>
          <div className="mt-12">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              System Requirements
            </h2>

            <div className="mt-10">
              {/* RequirementCard */}
              <div className="w-full overflow-hidden">
                <div className="flex justify-between gap-x-10 w-full">
                  {systemRequirements?.length != 0 && (
                    <>
                      <span className="text-xs w-[164px] text-gray-400 uppercase">
                        Requirement
                      </span>
                      <span className="text-xs w-[164px] text-gray-400 uppercase">
                        Time Created
                      </span>
                    </>
                  )}
                </div>

                {systemRequirements?.length === 0 && (
                  <div className="w-full">
                    <Image
                      src={empty}
                      alt="Nothing here"
                      className="mx-auto"
                      width={130}
                    />
                    <h3 className="text-center text-sm">
                      No system requirement has been added just yet. Please hang
                      in tight, we will notify you as soon as we get an update.
                    </h3>
                  </div>
                )}

                {systemRequirements?.map((systemRequirement) => (
                  <ul
                    key={systemRequirement._id}
                    className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between w-full"
                  >
                    <li className="text-sm w-[164px]">
                      {systemRequirement.requirement}
                    </li>
                    <li className="text-sm w-[164px]">
                      <ReactTimeAgo
                        date={systemRequirement.createdAt}
                        locale="en-US"
                      />
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* OVERVIEW */}
      <div className="mt-20">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            Router.back();
          }}
        >
          <FaArrowLeft size={15} className="my-4 textnormal" />
          <p className="text-sm my-auto">Go back</p>
        </div>
        <div className="flex justify-between lg:gap-x-10 border-b-[.5px] pb-3">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold my-auto">
              System Requirements - {systemRequirements?.length}
            </h1>
            <p className="text-sm max-w-sm">{userRequirement?.requirement}</p>
          </div>
          <button
            onClick={openFRModal}
            className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Add Functional Requirement</span>
            <FaPlus className="my-auto" />
          </button>
          <button
            onClick={openNFRModal}
            className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Add Non-Functional Requirement</span>
            <FaPlus className="my-auto" />
          </button>
        </div>
        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          {/* RequirementCard */}
          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <div className="flex justify-between gap-x-10 min-w-[750px]">
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Requirement
              </span>
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Type
              </span>
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Time Created
              </span>
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Actions
              </span>
            </div>

            {/* {userRequirement?.functionalRequirements?.length === 0 && (
              <div className="w-full mx-auto mt-10">
                <Image
                  src={empty}
                  alt="Nothing here"
                  className="mx-auto"
                  width={150}
                />
                <h3 className="text-center">
                  It's lonely here... Try adding a user requirement.
                </h3>
              </div>
            )} */}

            {userRequirement?.functionalRequirements?.map(
              (systemRequirement) => (
                <div
                  onClick={() => {
                    setCurrentItem(systemRequirement);
                    // fetchSystemRequirements(systemRequirement._id);
                    // setIsDetailModalOpen(true);
                  }}
                  key={systemRequirement._id}
                  className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                >
                  <span className="text-sm w-[187px]">
                    {systemRequirement.requirement}
                  </span>
                  <span className="text-sm w-[187px]">Functional</span>
                  <span className="text-sm w-[187px]">
                    <ReactTimeAgo
                      date={systemRequirement.createdAt}
                      locale="en-US"
                    />
                  </span>
                  <span className="text-sm w-[187px]">
                    <button>
                      <FaPencilAlt size={14} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() =>
                        deleteSystemRequirement(systemRequirement._id)
                      }
                      className="ml-5"
                    >
                      <FaTrashAlt size={14} className="text-red-500" />
                    </button>
                  </span>
                </div>
              )
            )}

            {userRequirement?.nonFunctionalRequirements?.map(
              (systemRequirement) => (
                <div
                  onClick={() => {
                    setCurrentItem(systemRequirement);
                    // fetchSystemRequirements(systemRequirement._id);
                    // setIsDetailModalOpen(true);
                  }}
                  key={systemRequirement._id}
                  className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
                >
                  <span className="text-sm w-[187px]">
                    {systemRequirement.requirement}
                  </span>
                  <span className="text-sm w-[187px]">Non Functional</span>
                  <span className="text-sm w-[187px]">
                    <ReactTimeAgo
                      date={systemRequirement.createdAt}
                      locale="en-US"
                    />
                  </span>
                  <span className="text-sm w-[187px]">
                    <button>
                      <FaPencilAlt size={14} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => {
                        console.log(systemRequirement._id);
                        deleteNonFunctionalRequirement(systemRequirement._id);
                      }}
                      className="ml-5"
                    >
                      <FaTrashAlt size={14} className="text-red-500" />
                    </button>
                  </span>
                </div>
              )
            )}

            <ol className="mt-5 w-[750px] max-w-[750px]"></ol>
          </div>
        </div>
      </div>
    </>
  );
}
