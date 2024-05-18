import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginParams, signupParams } from '../../../types'
import axios from 'axios'

const backendURL = 'http://localhost:3000'

export const registerUser = createAsyncThunk(
    'auth/signup',
    async (creds: signupParams, { rejectWithValue, getState }) => {
        try {

            const res = await axios.post(`${backendURL}/api/auth/signup`, creds)

            // console.log("res", res)
            // console.log("getState", getState())

            return res.data

        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (creds: loginParams, { rejectWithValue, getState }) => {
        try {

            const res = await axios.post(`${backendURL}/api/auth/login`, creds)
            localStorage.setItem('token', res.data.token)
            return res.data

        } catch (error) {
            rejectWithValue(error)
        }
    })

// export const verifyToken = createAsyncThunk(
//     'auth/verify',
//     async (token: string, { rejectWithValue }) => {
//         try {

//             const res = await axios.post(`${backendURL}/api/auth/verify-token`, { token })
//             return res.data

//         } catch (error) {
//             rejectWithValue(error)
//         }
//     }
// )