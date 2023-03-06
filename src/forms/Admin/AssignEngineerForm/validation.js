import * as yup from "yup";

const requiredField = "* This field is required";
const AssignEngineerFormSchema = yup.object().shape({
  engineer: yup.string().required(requiredField),
});

export default AssignEngineerFormSchema;
