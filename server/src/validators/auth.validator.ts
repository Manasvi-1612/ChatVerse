import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().trim().required('Email is required')
        .email('Email is invalid'),

    password: yup.string().trim().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters')
})

export const signupSchema = yup.object({
    email: yup.string().trim().required('Email is required')
        .email('Email is invalid'),
    username: yup.string().trim().required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 20 characters'),

    password: yup.string().trim().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters')
})