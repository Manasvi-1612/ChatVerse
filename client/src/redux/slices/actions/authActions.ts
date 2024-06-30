
import { apiSlice } from "../apiSlice";
import { logout, setCredentials } from "../authSlice";

const authActions = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted({ dispatch, queryFulfilled }) {
                try {
                    //on success - queryhas been fulfilled
                    await queryFulfilled;
                    // console.log('logout success', data)
                    dispatch(logout())

                    //reset api cache state
                    dispatch(apiSlice.util.resetApiState())

                } catch (error) {
                    console.log('logout error', error)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted({ dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        verify: builder.mutation({
            query: () => ({
                url: '/auth/verify',
                method: 'GET'
            }),
            async onQueryStarted({ queryFulfilled }) {
                try {
<<<<<<< HEAD
                    await queryFulfilled
=======

                    await queryFulfilled

>>>>>>> 7f66f1c0d0b0c2f16704c4665a160e585e42d2b1
                } catch (err) {
                    console.log(err)
                }
            }

        }),
    })
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation, useVerifyMutation } = authActions