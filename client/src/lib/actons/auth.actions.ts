import { loginParams, signupParams } from "../../types"
import { handleError } from "../utils"

export const loginUser = async (creds: loginParams) => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })

        const data = await response.json()
        return data
    } catch (error) {
        handleError(error)
    }
}

export const signupUser = async (creds: signupParams) => {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })

        const data = await response.json()
        return data
    } catch (error) {
        handleError(error)
    }
}