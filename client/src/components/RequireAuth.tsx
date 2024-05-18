import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"

const RequireAuth = ({ children, fallbackPath }: { children: React.ReactNode, fallbackPath?: string }) => {

    const dispatch = useDispatch()

    const { isLoggedIn, token } = useSelector((state: RootState) => state.auth)

    const isAuth = token !== null

    const fp = fallbackPath || "/"

    return (
        <>
            {isAuth ? children : <Navigate to={fp} />}
        </>
    )
}

export default RequireAuth
