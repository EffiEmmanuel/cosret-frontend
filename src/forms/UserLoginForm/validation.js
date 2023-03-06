import * as yup from "yup";

const requiredField = "* This field is required";
const UserLoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address must be in format name@emample.com")
    .required(requiredField),
  password: yup
    .string()
    .min(8, "Password cannot be less than 8 characters")
    .required(requiredField),
});

export default UserLoginFormSchema;
