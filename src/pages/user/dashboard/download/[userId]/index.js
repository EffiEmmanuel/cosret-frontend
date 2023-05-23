import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";

function Download() {
  // REQUIREMENT SPECIFICATION REF
  let requirementSpecificationRef = useRef();

  const router = useRouter();
  const { userId, projectId } = router.query;

  const [projectRequirements, setProjectRequirements] = useState([]);

  console.log(userId);
  console.log("PID", projectId);

  const [project, setProject] = useState();

  // Make API call to get project by id
  async function getProjectById() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/${projectId}`)
      .then((res) => {
        console.log("res.data:", res.data);
        setProject(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function fetchUserRequirements() {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/project-requirements/${userId}/${projectId}`
      )
      .then((res) => {
        console.log("PROJECT REQUIREMENTS:", res.data);
        // setUserRequirements(res.data.data);
        setProjectRequirements(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ??
            "Failed to generate requirement specification document. Please trty again."
        );
        console.log("DOWNLOADREQ SPEC ERR:", err);
      });
  }

  useEffect(() => {
    getProjectById();
    fetchUserRequirements();
  }, []);

  return (
    <>
      <>
        <ReactToPrint
          trigger={() => (
            <button
              onClick={() => {
                getProjectById();
                fetchUserRequirements();
              }}
              className="text-sm my-auto flex gap- bg-[#181818] text-white border-gray-400 border-[.5px] border-dotted p-2"
            >
              <span className="my-auto">Download as PDF</span>
              <FaDownload className="my-auto mx-2" />
            </button>
          )}
          // onBeforeGetContent={async () => {
          //   setDocumentVisibility("block");
          //   await fetchUserRequirements();
          // }}
          content={() =>
            projectRequirements
              ? requirementSpecificationRef
              : toast.error(
                  "An error occured while generating the requirement specification document. Please try again"
                )
          }
          documentTitle={`Requirement Specification-document`}
          // pageStyle="print"
        />
      </>

      <div
        ref={(el) => (requirementSpecificationRef = el)}
        className={`min-h-screen document w-full p-20 bg-white`}
      >
        <h1 className="font-bold my-5">Project title:</h1>
        <span className="font-normal"> {project?.name}</span>

        <h1 className="font-bold my-5">Project owner:</h1>
        <span className="font-normal">
          {project?.owner?.firstName} {project?.owner?.lastName}
        </span>

        <h1 className="font-bold my-5">Project description:</h1>
        <span className="font-normal"> {project?.description}</span>

        <h1 className="font-bold underline mt-28 mb-16 text-xl text-center">
          Requirement Specification
        </h1>

        <table className="w-full border-black border-[2px] p-10">
          <tr className="flex w-full border-black border-b-[2px]">
            <td className="max-w-[5%] px-1 py-5 text-black border-black border-r-[2px]">
              S/N
            </td>
            <td className="w-[29%] p-5 text-black border-black border-r-[2px]">
              User Requirements
            </td>
            <td className="w-[29%] p-5 text-black border-black border-r-[2px]">
              Functional Requirements
            </td>
            <td className="w-[29%] p-5 text-black">
              Non-Functional Requirements
            </td>
          </tr>

          {projectRequirements?.map((requirement, index) => {
            return (
              <>
                <tr
                  key={requirement?._id}
                  className="flex w-full border-black border-b-[2px]"
                >
                  <td className="py-5 px-[13.5py-5 px-[13.5px] text-black w-[2.75%] font-bold border-black border-r-[2px]">
                    {index + 1}.
                  </td>
                  <td className="p-5 w-[29%] border-black border-r-[2px]">
                    {requirement?.requirement}
                  </td>
                  <td className="p-5 w-[29%] border-black border-r-[2px]"></td>
                  <td className="p-5 w-[29%]"></td>
                </tr>
                {requirement?.functionalRequirements?.map(
                  (functionalRequirement) => {
                    return (
                      <tr
                        key={functionalRequirement?._id}
                        className="flex w-full border-black border-b-[2px]"
                      >
                        <td className="py-5 px-[13.5px] w-[2.75%] font-bold border-black border-r-[2px]"></td>
                        <td className="p-5 w-[29%] border-black border-r-[2px]"></td>
                        <td className="p-5 w-[29%] border-black border-r-[2px]">
                          {functionalRequirement?.requirement}
                        </td>
                        <td className="p-5 w-[29%]"></td>
                      </tr>
                    );
                  }
                )}
                {requirement?.nonFunctionalRequirements?.map(
                  (nonFunctionalRequirement) => {
                    return (
                      <tr
                        key={nonFunctionalRequirement?._id}
                        className="flex w-full border-black border-b-[2px]"
                      >
                        <td className="py-5 px-[13.5px] w-[2.75%] font-bold border-black border-r-[2px]"></td>
                        <td className="p-5 w-[29%] border-black border-r-[2px]"></td>
                        <td className="p-5 w-[29%] border-black border-r-[2px]"></td>
                        <td className="p-5 w-[29%] text-black">
                          {nonFunctionalRequirement?.requirement}
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Download;
