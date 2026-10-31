import * as yup from "yup";

export const ALLOWED_COURSES = [
  "full stack development",
  "graphic design",
  "UI/UX",
];

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Student name is required"),
  GRid: yup
    .number()
    .typeError("GR ID must be a valid number")
    .positive("GR ID must be a positive number")
    .integer("GR ID must be an integer")
    .required("GR ID is required"),
  course: yup
    .string()
    .oneOf(ALLOWED_COURSES, "Please select a valid course from backend")
    .required("Course is required"),
  MobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be a valid 10-digit number")
    .required("Mobile number is required"),
});

export default validationSchema;
