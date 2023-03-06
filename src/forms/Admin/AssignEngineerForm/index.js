import { AdminContext } from "@/components/Admin/AdminDashboard";
import { UserContext } from "@/components/Dashboard";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaCheck, FaLink, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import AssignEngineerFormSchema from "./validation";

export default function AssignEngineerForm(props) {
  //   Get Admin and Project Data
  const { admin } = useContext(AdminContext);
  const project = props.project;
  const engineers = props.engineers;

  //   Loading state
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values, actions) {
    setIsLoading(true);
    // Send API request here
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/admin/projects/assign-engineer/${project?._id}/${values?.engineer}/${project?.owner?._id}`
      )
      .then((res) => {
        console.log("RES.DATA:", res.data);
        // further actions
        toast.success(res.data.message);
        props.fetchProjectsPendingAssignment();
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
      engineer: "",
    },
    validationSchema: AssignEngineerFormSchema,
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
                htmlFor="engineers"
                className="uppercase text-sm absolute left-0"
              >
                Assign Engineer:
              </label>
              <select
                className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
                name="engineer"
                value={values.engineer}
                onChange={handleChange}
              >
                <option value="">--SELECT ENGNEER--</option>
                {engineers?.map((engineer) => (
                  <option key={engineer?._id} value={engineer?._id}>
                    {engineer?.firstName} {engineer?.lastName}
                  </option>
                ))}
              </select>

              <p className="text-left mt-3 text-xs">
                {errors.engineer ? errors.engineer : ""}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between mt-5">
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
                  <span className="text-center">Assign</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
