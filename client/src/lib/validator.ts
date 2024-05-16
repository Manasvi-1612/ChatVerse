import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email!").required("Email required!"),
    password: Yup.string().trim()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
})

export const SignupValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email!").required("Email required!"),
    name: Yup.string().trim()
        .required("Name required!")
        .min(3, "Name too short!")
        .max(28, "Name too long!"),
    password: Yup.string().trim()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
})