import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { apiSlice } from "./slices/apiSlice";
const dev = import.meta.env.DEV



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(apiSlice.middleware),
    //devTools is not enabled in production
    devTools: dev,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch