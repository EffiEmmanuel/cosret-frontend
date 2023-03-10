import { UserContext } from "@/components/Dashboard";
import { EngineerContext } from "@/components/Engineer/EngineerDashboard";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaCheck, FaLink, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import AddSystemRequirementFormSchema from "./validation";

export default function AddSystemRequirementForm(props) {
  //   Get User Data
  const { engineer } = useContext(EngineerContext);
  const project = props.project;
  const userRequirementId = props.userRequirementId;
  const systemRequirements = props.systemRequirements;

  //   Loading state
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values, actions) {
    setIsLoading(true);
    // Send API request here
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/system-requirements?userRequirementId=${userRequirementId}&projectId=${project?._id}&engineerId=${engineer?._id}`,
        { requirement: values.requirement }
      )
      .then((res) => {
        console.log("ADD UR RES:", res.data);
        // Updating the user requirements list
        const newSystemRequirement = res.data.data;
        props.setSystemRequirements([
          newSystemRequirement,
          ...systemRequirements,
        ]);
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

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      requirement: "",
    },
    validationSchema: AddSystemRequirementFormSchema,
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
                placeholder="The system shall..."
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
          </div>
        </div>
      </form>
    </div>
  );
}
