import axios from "axios";
import { useFormik } from "formik";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpSchema from "./validation";
// import { redirect } from "next/navigation";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();
  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    // TO-DO: Send API request to server
    if (values.accountType == "user") {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`, {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setIsLoading(false);
          actions.resetForm();
          Router.push("/accounts/user/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    } else {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/engineers`, {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          setIsLoading(false);
          actions.resetForm();
          Router.push("/accounts/engineer/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      accountType: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit,
  });
  return (
    <form
      className=""
      onSubmit={(e) => {
        if (values.accountType === "engineer") {
          values.username = `${values?.firstName} $${values?.lastName}`;
        }
        handleSubmit(e);
      }}
    >
      <ToastContainer />
      <div className="px-20 lg:px-64">
        <div className="flex flex-col justify-between gap-x-20 align-middle w-full">
          <div className="lg:w-1/2 mx-auto w-full relative">
            <label
              htmlFor="firstName"
              className="uppercase text-sm absolute left-0"
            >
              First name:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="firstName"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="John"
            />
            <p className="text-left mt-3 text-xs">
              {errors.firstName ? errors.firstName : ""}
            </p>
          </div>
          <div className="lg:w-1/2 mx-auto w-full mt-10 relative">
            <label
              htmlFor="lastName"
              className="uppercase text-sm absolute left-0"
            >
              Last name:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="lastName"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
            <p className="text-left mt-3 text-xs">
              {errors.lastName ? errors.lastName : ""}
            </p>
          </div>
          {values?.accountType === "user" && (
            <div className="lg:w-1/2 mx-auto w-full mt-10 relative">
              <label
                htmlFor="username"
                className="uppercase text-sm absolute left-0"
              >
                Username:
              </label>
              <input
                className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder={
                  `${values.firstName.toLowerCase()}${values.lastName.toLowerCase()}` ||
                  "@username"
                }
              />
              <p className="text-left mt-3 text-xs">
                {errors.username ? errors.username : ""}
              </p>
            </div>
          )}
          <div className="lg:w-1/2 mx-auto w-full relative mt-10">
            <label
              htmlFor="accountType"
              className="uppercase text-sm absolute left-0"
            >
              Account type:
            </label>
            <select
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              name="accountType"
              value={values.accountType}
              onChange={handleChange}
            >
              <option value="">--Select account type--</option>

              <option value="user">User</option>
              <option value="engineer">Engineer</option>
            </select>

            <p className="text-left mt-3 text-xs">
              {errors.accountType ? errors.accountType : ""}
            </p>
          </div>
          <div className="lg:w-1/2 mx-auto w-full relative mt-10">
            <label
              htmlFor="email"
              className="uppercase text-sm absolute left-0"
            >
              Email Address:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="abc@example.com"
            />

            <p className="text-left mt-3 text-xs">
              {errors.email ? errors.email : ""}
            </p>
          </div>
          <div className="lg:w-1/2 mx-auto w-full relative mt-10">
            <label
              htmlFor="password"
              className="uppercase text-sm absolute left-0"
            >
              Password:
            </label>
            <input
              className="w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
            />
            <p className="text-left mt-3 text-xs">
              {errors.password ? errors.password : ""}
            </p>
          </div>
        </div>

        <div className="w-full flex lg:justify-center lg:mt-10 mt-10">
          <button
            type="submit"
            className="bg-black text-white h-16 w-44 px-8 rounded-lg -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            {isLoading ? (
              <>
                <FaSpinner className="my-auto mx-auto text-white text-center text-lg animate-spin" />
                {/* <span>Adding...</span> */}
              </>
            ) : (
              <>
                <span className="text-center">Create account</span>
              </>
            )}
          </button>
        </div>
        <p className="text-left mt-20 lg:text-center text-sm">
          Already have an account?{" "}
          <Link className="font-semibold" href="/accounts/login">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
