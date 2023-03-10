import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLoginFormSchema from "./validation";

function UserLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    console.log("HI hi:", process.env.NEXT_PUBLIC_BASE_URL_API);
    // TO-DO: Send API request to server
    await axios
      //   .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/login`, {
      .post(`https://cosret-backend.vercel.app/api/users/login`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data);
        Router.push("/user/dashboard");
        setIsLoading(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(true);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UserLoginFormSchema,
    onSubmit,
  });
  return (
    <form className="" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="px-20 lg:px-64">
        <div className="flex flex-col justify-between gap-x-20 align-middle w-full">
          <div className="lg:w-1/2 mx-auto w-full relative">
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

            <p className="text-left mt-3 text-sm">
              <Link className="font-semibold" href="/accounts/login">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full flex lg:justify-center lg:mt-10 mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-black text-white h-16 w-44 px-8 rounded-lg -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            {isLoading ? (
              <FaSpinner className="text-white animate-spin my-auto mx-auto text-center text-lg" />
            ) : (
              "Log in"
            )}
          </button>
        </div>
        <p className="text-left mt-20 lg:text-center text-sm">
          Don't have an account?{" "}
          <Link className="font-semibold" href="/accounts/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default UserLoginForm;
