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

export default function EngineerProjectOverview(props) {
  return (
    <>
      {/* OVERVIEW */}
      <div>
        <div className="flex justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
          <h1 className="text-xl font-bold my-auto">{props?.project?.name}</h1>
          <button
            // onClick={openModal}
            className="text-sm my-auto flex gap- bg-[#181818] text-white border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Submit Project</span>
            <FaPaperPlane className="my-auto" />
          </button>
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
