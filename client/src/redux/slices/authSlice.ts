import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

// initial state for logged in status
const initialState: AuthState = {
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    }
  },
})


export const { setCredentials, logout } = slice.actions;

export default slice.reducer;
export const authSelector = (state: { auth: AuthState }) => state.auth.token