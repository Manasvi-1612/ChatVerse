import { configureStore, isImmutableDefault } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { apiSlice } from "./slices/apiSlice";
const dev = import.meta.env.DEV

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(apiSlice.middleware),
    //devTools is not enabled in production
    devTools: dev,
})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch