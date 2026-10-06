    import * as yup from "yup"

    const validationSchema = yup.object().shape({
        name: yup.string().required("name is required"),
        GRid: yup.string().required("GRid is required"),
        course: yup.string().required("course is required"),
        MobileNumber: yup.string().required("Mobile number is required"),

    });

    export default validationSchema