import { UserContext } from "@/components/Dashboard";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateNewProjectFormSchema from "./validation";

function CreateNewProjectForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  //   User Context
  const { user } = useContext(UserContext);

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    console.log("HI hi:", process.env.NEXT_PUBLIC_BASE_URL_API);
    // TO-DO: Send API request to server
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/projects?owner=${user?._id}`,
        {
          name: values.name,
          description: values.description,
        }
      )
      .then((res) => {
        console.log("RESPONSE:", res.data);
        const newProject = res.data.data;
        const updatedProjects = [newProject, ...user.projects];
        user.projects = updatedProjects;
        toast.success(res.data.message);
        actions.resetForm();
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateNewProjectFormSchema,
    onSubmit,
  });
  return (
    <form className="" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="">
        <div className="flex flex-col justify-between gap-x-20 w-full">
          <div className="md:max-w-xl w-full relative">
            <label htmlFor="name" className="uppercase text-sm absolute left-0">
              Project Title
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="The next big thing ✨"
            />

            <p className="text-left mt-3 text-xs">
              {errors.name ? errors.name : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative mt-10">
            <label
              htmlFor="description"
              className="uppercase text-sm absolute left-0"
            >
              Description
            </label>
            <textarea
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="A short description for your project"
            ></textarea>
            <p className="text-left mt-3 text-xs">
              {errors.description ? errors.description : ""}
            </p>
          </div>
        </div>

        <div className="w-full mt-5">
          <button
            type="submit"
            className="bg-black text-white h-16 w-44 px-8 rounded-lg -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            {isLoading ? (
              <FaSpinner className="text-white animate-spin my-auto mx-auto text-center text-lg" />
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNewProjectForm;
