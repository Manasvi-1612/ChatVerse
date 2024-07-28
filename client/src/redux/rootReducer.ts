import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

export const rootReducer = combineReducers({
    //dynamically add apiSlice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
});