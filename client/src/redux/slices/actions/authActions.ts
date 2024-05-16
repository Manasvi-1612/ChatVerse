import { createAsyncThunk } from '@reduxjs/toolkit'
import { signupParams } from '../../../types'
import axios from 'axios'

const backendURL = 'http://localhost:3000'

export const registerUser = createAsyncThunk(
    'auth/signup',
    async (creds: signupParams, { rejectWithValue, getState }) => {
        try {

            const res = await axios.post(`${backendURL}/api/auth/signup`, creds)

            if (!(getState() as any).auth.error) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }

            console.log("res", res)
            console.log("getState", getState())

            return res

        } catch (error) {
            rejectWithValue(error)
        }
    }
)