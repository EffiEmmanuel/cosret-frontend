import * as yup from "yup";

const requiredField = "* This field is required";
const AddSystemRequirementFormSchema = yup.object().shape({
  requirement: yup.string().required(requiredField),
});

export default AddSystemRequirementFormSchema;
