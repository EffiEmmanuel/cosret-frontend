import { useFormik } from "formik";
import Link from "next/link";
import SignUpSchema from "./validation";

function UserLoginForm() {
  const onSubmit = async (values, actions) => {
    // TO-DO: Send API request to server
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      accountType: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit,
  });
  return (
    <form className="" onSubmit={handleSubmit}>
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
            type="submit"
            className="bg-black text-white h-16 w-44 px-8 rounded-lg -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            Log in
          </button>
        </div>
        <p className="text-left mt-20 lg:text-center text-sm">
          Don't have an account?{" "}
          <Link className="font-semibold" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default UserLoginForm;
