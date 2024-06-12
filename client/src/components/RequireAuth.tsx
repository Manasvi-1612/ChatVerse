//This Component is used to authenticate the user even thier access token is expired.

import React, { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { useRefreshMutation } from "../redux/slices/actions/authActions"
import useLocalStorage from "../hooks/useLocalStorage"
import { useSelector } from "react-redux"
import { authSelector } from "../redux/slices/authSlice"
const prod = import.meta.env.PROD

const RequireAuth = ({ children, fallbackPath }: { children: React.ReactNode, fallbackPath?: string }) => {

    const [storage, setStorage] = useLocalStorage()
    const token = useSelector(authSelector)

    const [refresh, { isSuccess, isUninitialized, isLoading, isError }] = useRefreshMutation()

    const [trueSuccess, setTrueSuccess] = useState(false)

    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === true || prod) {   //React 18 strict mode(only in development) fix 
            const res = async () => {
                try {
                    const response =
                        await refresh({})

                    //There's one prblm we have isSuccess which can be set to true even before the setCredentials action is dispatched, that's why we set one more state to check yes we got the thing!
                    setTrueSuccess(true)
                } catch (error) {
                    console.log(error)
                }
            }

            //this !token is - when we refresh the page, we don't have the token in the state, so we need to refresh the token again
            if (!token && storage) {
                res()
            }
        }

        return () => {
            effectRan.current = true
        }

    }, [])

    if (isLoading) return <div>Loading...</div>
    else if (isError) {
        console.log("Error");
        < Navigate to="/" />
    }

    const fp = fallbackPath || ""

    let content;

    if (!storage) { // persist: no
        console.log('no persist')
        content = children
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <div>Loading...</div>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = <Navigate to={'/'} />
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = children
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = children
    }

    return (
        <>
            {content}
        </>
    )
}

export default RequireAuth
