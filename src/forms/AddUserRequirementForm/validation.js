import * as yup from "yup";

const requiredField = "* This field is required";
const AddUserRequirementFormSchema = yup.object().shape({
  requirement: yup.string().required(requiredField),
});

export default AddUserRequirementFormSchema;
