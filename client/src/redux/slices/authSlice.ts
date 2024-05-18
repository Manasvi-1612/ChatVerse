import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./actions/authActions";
import { loginParams } from "../../types";
import { string } from "yup";

interface UsersState {
  isLoggedIn: boolean,
  token: string | null,
  isLoading: boolean,
  error: boolean,
}



// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

// initial state for logged in status
const initialState: UsersState = {
  isLoggedIn: false,
  token,
  isLoading: false,
  error: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, (state: UsersState, action: Action) => {
        state.isLoading = false
        state.error = true
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, handleSuccess)

  }
})


const handlePending = (state: UsersState, action: PayloadAction) => {
  console.log(action?.payload)
  state.isLoading = true
  state.error = false
}

function handleSuccess(state: UsersState, action: PayloadAction<UsersState>) {
  // check if user is verified
  state.isLoading = false;
  state.error = false;
  if (action.payload) {
    state.isLoggedIn = true;
    state.token = action.payload.token;
  } else {
    state.isLoggedIn = false;
  }
  console.log(action)
}

const handleRejected = (state: UsersState, action: Action) => {
  console.log(action)
  state.isLoading = false
  state.error = true
}

export default slice.reducer;