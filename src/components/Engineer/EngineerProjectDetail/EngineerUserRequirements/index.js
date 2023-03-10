import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaInfo,
  FaInfoCircle,
  FaLink,
  FaPencilAlt,
  FaPlus,
  FaTimes,
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
import { Fade } from "react-reveal";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function EngineerUserRequirements(props) {
  const Router = useRouter();
  const [currentItem, setCurrentItem] = useState();

  const [userRequirements, setUserRequirements] = useState(
    props?.project?.userRequirements
  );

  const [systemRequirements, setSystemRequirements] = useState();

  const { engineer } = useContext(EngineerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isToolTipHidden, setIsTooltipHidden] = useState(true);

  //   Modal Configs
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement("#appElement");
  }, []);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
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
      {/* OVERVIEW */}
      <div>
        <div className="flex relative justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
          <div className="flex gap-x-5">
            <h1 className="text-xl font-bold my-auto ">
              User Requirements - {userRequirements?.length}
            </h1>
            <FaInfoCircle
              size={13}
              className="text-slate-600 my-auto cursor-pointer"
              onClick={() => setIsTooltipHidden(false)}
            />
          </div>
          {!isToolTipHidden && (
            <Fade duration={500}>
              <div className="text-sm max-w-xs absolute -top-24 left-20 bg-white drop-shadow-lg shadow-sm rounded-lg p-5">
                <div className="relative w-full flex justify-between mb-2">
                  <p className="text-sm text-gray-400">TOOLTIP ✨</p>
                  <FaTimes
                    size={10}
                    className="cursor-pointer"
                    onClick={() => setIsTooltipHidden(true)}
                  />
                </div>
                <p>
                  Click on a user requirement to add system requirements to it.
                </p>
              </div>
            </Fade>
          )}
          {/* <button
            onClick={openModal}
            className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Add new</span>
            <FaPlus className="my-auto" />
          </button> */}
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
                  console.log("CURRENT ITEM:", userRequirement);
                  Router.push(
                    `/engineer/dashboard/projects/${props?.project?.slug}/system-requirements/${userRequirement?._id}/`
                  );
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
