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
    username: Yup.string().trim()
        .required("Username required!")
        .min(3, "Username too short!")
        .max(28, "Username too long!"),
    password: Yup.string().trim()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
})