import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://chatverse-bhj2.onrender.com/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {

        const token: any = (getState() as RootState).auth.token
        console.log("token", getState())

        if (token) {
            headers.set("authorization", `Bearer ${token?.accessToken}`)
        }

        return headers

    }
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)



    // If you want, handle other status codes, too
    if (result.error?.status !== null) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log("refreshResult", refreshResult)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                (refreshResult.error.data as { message: string }).message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: () => ({})
})