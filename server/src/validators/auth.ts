import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().trim().required('Email is required')
        .email('Email is invalid'),

    password: yup.string().trim().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters')
})

export const signupSchema = yup.object({
    email: yup.string().email("Invalid email!").required("Email required!"),
    name: yup.string().trim()
        .required("Name required!")
        .min(3, "Name too short!")
        .max(28, "Name too long!"),
    password: yup.string().trim()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
})