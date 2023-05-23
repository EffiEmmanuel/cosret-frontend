import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import { UserContext } from "../Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function ProjectOverview(props) {
  // REQUIREMENT SPECIFICATION REF
  let requirementSpecificationRef = useRef();

  const { user } = useContext(UserContext);

  const [projectRequirements, setProjectRequirements] = useState([]);

  const [documentVisibility, setDocumentVisibility] = useState("hidden");

  // REJECT SUBMISSION
  async function rejectSubmission() {
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/projects/${user?._id}/${props?.project._id}`,
        { isComplete: false }
      )
      .then((res) => {
        console.log("REJECT SUBMISSION:", res.data);
        // setUserRequirements(res.data.data);
        toast.success(
          "Project Submission Rejected Successfully! This project has been sent back to the engineer for review."
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ??
            "Project Rejection Failed. Please trty again."
        );
        console.log("PROJECT SUBMISSION ERR:", err);
      });
  }

  async function fetchUserRequirements() {
    if (props?.project) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements/project-requirements/${user?._id}/${props?.project?._id}`
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
  }

  // useEffect(() => {
  //   fetchUserRequirements();
  // }, [props?.project]);

  return (
    <>
      <ToastContainer />

      {/* OVERVIEW */}

      <div className="flex w-full lg:gap-x-10 border-b-[.5px] pb-3">
        <h1 className="text-xl font-bold my-auto">{props?.project?.name}</h1>
        {props?.project?.isComplete && (
          <>
            <ReactToPrint
              trigger={() => (
                <button
                  onClick={() => setDocumentVisibility("visible")}
                  className="text-sm my-auto flex gap- bg-[#181818] text-white border-gray-400 border-[.5px] border-dotted p-2"
                >
                  <span className="my-auto">Download as PDF</span>
                  <FaDownload className="my-auto mx-2" />
                </button>
              )}
              onBeforeGetContent={async () => {
                setDocumentVisibility("block");
                await fetchUserRequirements();
              }}
              content={() =>
                projectRequirements
                  ? requirementSpecificationRef
                  : toast.error(
                      "An error occured while generating the requirement specification document. Please try again"
                    )
              }
              documentTitle={`${props?.project?.name} Requirement Specification-document`}
              // pageStyle="print"
            />

            <button
              onClick={rejectSubmission}
              className="text-sm my-auto flex gap- bg-red-500 text-white border-gray-400 border-[.5px] border-dotted p-2"
            >
              <span className="my-auto">Reject Submission</span>
              <FaTimes className="my-auto mx-2" />
            </button>
          </>
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
      <div className="mt-10">
        <h2 className="text-lg font-semibold">Requirement Engineer</h2>
        <p className="space-y-48 text-sm text-justify">
          {props?.project?.engineerAssigned?.firstName}{" "}
          {props?.project?.engineerAssigned?.lastName}
          {!props?.project?.engineerAssigned && "Not assigned yet"}
        </p>
      </div>

      {props?.project?.isComplete && (
        <>
          {/* OTHER DETAILS ABOUT PROJECT */}
          <div className="mt-10 mx-auto">
            <h2 className="text-lg font-semibold">
              Requirement Specification Preview
            </h2>
          </div>

          {/* REQUIREMENT SPECIFICATION DOCUMENT */}
          <div
            ref={(el) => (requirementSpecificationRef = el)}
            className={`min-h-screen w-full mt-10 document border-[.5px] border-black p-20 bg-white`}
          >
            <h1 className="font-bold my-5">Project title:</h1>
            <span className="font-normal"> {props?.project?.name}</span>

            <h1 className="font-bold my-5">Project owner:</h1>
            <span className="font-normal">
              {" "}
              {props?.project?.owner?.firstName}{" "}
              {props?.project?.owner?.lastName}
            </span>

            <h1 className="font-bold my-5">Project description:</h1>
            <span className="font-normal"> {props?.project?.description}</span>

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
      )}
    </>
  );
}
