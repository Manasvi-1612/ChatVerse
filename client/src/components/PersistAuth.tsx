//This Component is used to authenticate the user even thier access token is expired.

import { useEffect, useRef } from "react"
import { useLoginMutation } from "../redux/slices/actions/authActions"
const prod = import.meta.env.PROD


const PersistAuth = () => {
    const effectRan = useRef(false)

    const [refresh, { isLoading }] = useLoginMutation()

    useEffect(() => {

        if (effectRan.current === true || prod) { //React 18 strict mode(only in development) fix 
            const verifyRefreshToken = async () => {
                console.log("Verifying refresh token")
                try {
                    const response = await refresh({}) // Add an empty object as an argument
                    console.log("Refresh token verified", response)
                } catch (error) {
                    console.log("Error verifying refresh token")
                }
            }
        }

        return () => {
            effectRan.current = true
        }
    }, [])
}

export default PersistAuth