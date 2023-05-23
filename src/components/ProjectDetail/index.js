import { useState } from "react";
import {
  FaBook,
  FaCloud,
  FaCommentAlt,
  FaLaptop,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import ProjectChat from "../ProjectChat";
import ProjectOverview from "../ProjectOverview";
import SystemRequirements from "../SystemRequirements";
import UserRequirements from "../UserRequirements";

export default function ProjectDetail(props) {
  const [isOverview, setIsOverview] = useState(true);
  const [isUserRequirements, setIsUserRequirements] = useState(false);
  const [isSystemRequirements, setIsSystemRequirements] = useState(false);
  const [isChat, setIsChat] = useState(false);

  return (
    <section className="mt-20" id="appElement">
      {/* TABS */}
      <div className="text-sm flex flex-col-reverse md:flex-row gap-y-7 gap-x-7 mb-10 w-full border-b-[.5px] border-t-[.5px] py-3">
        <button
          className={`flex gap-x-2 ${
            isOverview ? "text-black font-bold" : "text-gray-400"
          }`}
          onClick={() => {
            setIsOverview(true);
            setIsUserRequirements(false);
            setIsSystemRequirements(false);
            setIsChat(false);
          }}
        >
          <FaBook className="my-auto" />
          <span className="my-auto">Overview</span>
        </button>
        <button
          className={`flex gap-x-2 ${
            isUserRequirements ? "text-black font-bold" : "text-gray-400"
          }`}
          onClick={() => {
            setIsOverview(false);
            setIsUserRequirements(true);
            setIsSystemRequirements(false);
            setIsChat(false);
          }}
        >
          <FaUserAlt className="my-auto" />
          <span className="my-auto">User Requirements</span>
        </button>
        {/* <button
          className={`flex gap-x-2 ${
            isSystemRequirements ? "text-black font-bold" : "text-gray-400"
          }`}
          onClick={() => {
            setIsOverview(false);
            setIsUserRequirements(false);
            setIsSystemRequirements(true);
            setIsChat(false);
          }}
        >
          <FaLaptop className="my-auto" />
          <span className="my-auto">System Requirements</span>
        </button> */}
        <button
          className={`flex gap-x-2 ${
            isChat ? "text-black font-bold" : "text-gray-400"
          }`}
          onClick={() => {
            setIsOverview(false);
            setIsUserRequirements(false);
            setIsSystemRequirements(false);
            setIsChat(true);
          }}
        >
          <FaCommentAlt className="my-auto" />
          <span className="my-auto">Chat</span>
        </button>
      </div>

      {/* OVERVIEW */}
      {isOverview && <ProjectOverview project={props.project} />}
      {/* {isOverview && <UserRequirements project={props.project} />} */}
      {isUserRequirements && <UserRequirements project={props.project} />}
      {isSystemRequirements && <SystemRequirements project={props.project} />}
      {isChat && <ProjectChat project={props.project} />}
    </section>
  );
}
