import { UserContext } from "@/components/Dashboard";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaCheck, FaLink, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import AddUserRequirementFormSchema from "./validation";

export default function AddUserRequirementForm(props) {
  //   Get User Data
  const { user } = useContext(UserContext);
  const project = props.project;
  const userRequirements = props.userRequirements;

  //   Loading state
  const [isLoading, setIsLoading] = useState(false);

  //   States to manage link copying
  const [copied, setCopied] = useState(false);

  async function onSubmit(values, actions) {
    setIsLoading(true);
    // Send API request here
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/user-requirements?userId=${user._id}&projectId=${project?._id}`,
        { ...values, source: `${user.firstName} ${user.lastName}` }
      )
      .then((res) => {
        console.log("ADD UR RES:", res.data);
        // Updating the user requirements list
        const newUserRequirement = res.data.data;
        props.setUserRequirements([newUserRequirement, ...userRequirements]);
        // further actions
        toast.success(res.data.message);
        actions.resetForm();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ADD UR ERROR:", err);
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  }

  //   COPIES TEXT TO CLIPBOARD: Used for add user requirement form in order to enable users share their unique link to other people so they can input requirements also
  function copyToClipBoard() {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/forms/${project?.uniqueId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      requirement: "",
    },
    validationSchema: AddUserRequirementFormSchema,
    onSubmit,
  });

  return (
    <div className="mt-16">
      <form className="" onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="">
          <div className="flex flex-col justify-between gap-x-20 align-middle w-full">
            <div className="mx-auto w-full relative">
              <label
                htmlFor="email"
                className="uppercase text-sm absolute left-0"
              >
                Requirement:
              </label>
              <input
                className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
                id="requirement"
                type="text"
                name="requirement"
                value={values.requirement}
                onChange={handleChange}
                placeholder="I want users to..."
              />

              <p className="text-left mt-3 text-xs">
                {errors.requirement ? errors.requirement : ""}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between mt-10">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-black text-white h-16 w-44 px-8 rounded-lg rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="my-auto mx-auto text-white text-center text-lg animate-spin" />
                  {/* <span>Adding...</span> */}
                </>
              ) : (
                <>
                  <span className="text-center">Add</span>
                </>
              )}
            </button>

            <p
              onClick={copyToClipBoard}
              className="font-semibold flex gap-2 text-sm mt-7 cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="my-auto text-cosretGreen" />
                  <span className="my-auto">Copied!</span>
                </>
              ) : (
                <>
                  <FaLink className="my-auto" />
                  <span className="my-auto">Copy Link</span>
                </>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
