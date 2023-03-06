import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Dashboard";

export default function ProjectOverview(props) {
  return (
    <>
      {/* OVERVIEW */}
      <div>
        <h1 className="text-xl font-bold border-b-[.5px] pb-3">
          {props?.project?.name}
        </h1>

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
          <h2 className="text-lg font-semibold">Requirement Engineer</h2>
          <p className="space-y-48 text-sm text-justify">
            {props?.project?.engineerAssigned}
            {!props?.project?.engineerAssigned && "Not assigned yet"}
          </p>
        </div>
      </div>
    </>
  );
}
