import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaPlaneDeparture,
  FaPlus,
  FaShip,
  FaShippingFast,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EngineerProjectOverview(props) {
  async function submitProject() {
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/${props?.project?.owner?._id}/${props?.project._id}`,
        { isComplete: true }
      )
      .then((res) => {
        console.log("DELETE UR RES:", res.data);
        // setUserRequirements(res.data.data);
        toast.success("Project Submitted Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ??
            "Project Submission Failed. Please trty again."
        );
        console.log("PROJECT SUBMISSION ERR:", err);
      });
  }

  console.log('CHATROOM:PO:', props?.project)

  return (
    <>
      <ToastContainer />
      {/* OVERVIEW */}
      <div>
        <div className="flex justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold my-auto">{props?.project?.name}</h1>
          {!props?.project?.isComplete && (
            <button
              onClick={submitProject}
              className="text-sm my-auto flex gap- bg-[#181818] text-white border-gray-400 border-[.5px] border-dotted p-2"
            >
              <span className="my-auto">Submit Project</span>
              <FaPaperPlane className="my-auto" />
            </button>
          )}
          {props?.project?.isComplete && (
            <button
              // onClick={submitProject}
              disabled
              className="text-sm my-auto flex gap- bg-[#777777] cursor-not-allowed text-white border-gray-400 border-[.5px] border-dotted p-2"
            >
              <span className="my-auto">Project Submitted</span>
              <FaPaperPlane className="my-auto" />
            </button>
          )}
        </div>

        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="space-y-48 text-sm text-justify">
            {props?.project?.description}
          </p>
        </div>
        {/* OTHER DETAILS ABOUT PROJECT */}
        {/* <div className="mt-10">
          <h2 className="text-lg font-semibold">Project Duration</h2>
          <p className="space-y-48 text-sm text-justify">
            {props?.project?.engineerAssigned}
            {!props?.project?.engineerAssigned && "Not assigned yet"}
          </p>
        </div> */}
        {/* OTHER DETAILS ABOUT PROJECT */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Project Owner</h2>
          <p className="space-y-48 text-sm text-justify">
            {props?.project?.owner?.firstName} {props?.project?.owner?.lastName}
            {!props?.project?.engineerAssigned && "Not assigned yet"}
          </p>
        </div>
      </div>
    </>
  );
}
