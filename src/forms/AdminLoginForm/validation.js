import * as yup from "yup";

const requiredField = "* This field is required";
const AdminLoginFormSchema = yup.object().shape({
  username: yup.string().required(requiredField),
  password: yup
    .string()
    .min(8, "Password cannot be less than 8 characters")
    .required(requiredField),
});

export default AdminLoginFormSchema;
