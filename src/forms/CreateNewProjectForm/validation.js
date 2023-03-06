import * as yup from "yup";

const requiredField = "* This field is required";
const CreateNewProjectFormSchema = yup.object().shape({
  name: yup.string().required(requiredField),
  description: yup.string().required(requiredField),
});

export default CreateNewProjectFormSchema;
