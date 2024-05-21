import React, { useEffect, useRef } from "react"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useRefreshMutation, useVerifyMutation } from "../redux/slices/actions/authActions"
const prod = import.meta.env.PROD

const RequireAuth = ({ children, fallbackPath }: { children: React.ReactNode, fallbackPath?: string }) => {

    const auth = useAuth()

    const [refresh] = useRefreshMutation()

    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true || prod) {
            const res = async () => {
                try {
                    const response =
                        await refresh({})
                    //const { accessToken } = response.data
                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
            }
            console.log("refreshing token", auth)
            if (!auth) res()
        }

        return () => {
            effectRan.current = true
        }
    }, [refresh])


    const isAuth = auth !== null

    const fp = fallbackPath || "/"

    return (
        <>
            {isAuth ? children : <Navigate to={fp} />}
        </>
    )
}

export default RequireAuth
