import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaLink,
  FaPencilAlt,
  FaPlus,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import empty from "../../../public/images/empty.png";
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
import { UserContext } from "../Dashboard";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function UserRequirements(props) {
  const [currentItem, setCurrentItem] = useState();

  const [userRequirements, setUserRequirements] = useState(
    props?.project?.userRequirements
  );

  const [systemRequirements, setSystemRequirements] = useState();

  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  //   Modal Configs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement("#appElement");
  }, []);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
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
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/${userRequirementId}/system-requirements?userId=${user?._id}&projectId=${props?.project._id}`
      )
      .then((res) => {
        console.log("SR:", res.data.data);
        setSystemRequirements(res.data.data);
      })
      .catch((err) => {
        console.log("SR ERR:", err);
      });
  }

  //   USER REQUIREMENT DETAIL
  useEffect(() => {
    async function getSystemRequirements() {
      setIsLoading(true);
      // Send API request here
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/system-requirements?userId=${user._id}&projectId=${props?.project?._id}`
        )
        .then((res) => {
          console.log("GET SR RES:", res.data);
          setSystemRequirements(res.data.data);
          //   props.setUserRequirements([newUserRequirement, ...userRequirements]);
          // further actions
          //   toast.success(res.data.message);
          //   actions.resetForm();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("ADD UR ERROR:", err);
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    }
  }, [currentItem]);

  //   ACTIONS
  async function deleteUserRequirement(userRequirementId) {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/${userRequirementId}?userId=${user?._id}&projectId=${props?.project._id}`
      )
      .then((res) => {
        console.log("DELETE UR RES:", res.data);
        setUserRequirements(res.data.data);
      })
      .catch((err) => {
        console.log("DELETE UR ERR:", err);
      });
  }

  return (
    <>
      {/* ADD USER REQUIREMENT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-red-500 max-w-lg mx-auto mt-[120px]"
      >
        <div className="h-[350px] shadow-lg p-14 bg-white text-center">
          <h2 className="font-semibold text-lg">Add User Requirement</h2>
          <AddUserRequirementForm
            userRequirements={userRequirements}
            setUserRequirements={setUserRequirements}
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
      <div>
        <div className="flex justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold my-auto">
            User Requirements - {userRequirements?.length}
          </h1>
          <button
            onClick={openModal}
            className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Add new</span>
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
                Time Created
              </span>
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Source
              </span>
              <span className="text-xs w-[187px] text-gray-400 uppercase">
                Actions
              </span>
            </div>

            {userRequirements?.length === 0 && (
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
            )}

            {userRequirements?.map((userRequirement) => (
              <div
                onClick={() => {
                  setCurrentItem(userRequirement);
                  fetchSystemRequirements(userRequirement._id);
                  setIsDetailModalOpen(true);
                }}
                key={userRequirement._id}
                className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
              >
                <span className="text-sm w-[187px]">
                  {userRequirement.requirement}
                </span>
                <span className="text-sm w-[187px]">
                  <ReactTimeAgo
                    date={userRequirement.createdAt}
                    locale="en-US"
                  />
                </span>
                <span className="text-sm w-[187px]">
                  {userRequirement.source}
                </span>
                <span className="text-sm w-[187px]">
                  <button>
                    <FaPencilAlt size={14} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => deleteUserRequirement(userRequirement._id)}
                    className="ml-5"
                  >
                    <FaTrashAlt size={14} className="text-red-500" />
                  </button>
                </span>
              </div>
            ))}

            <ol className="mt-5 w-[750px] max-w-[750px]"></ol>
          </div>
        </div>
      </div>
    </>
  );
}
