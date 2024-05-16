import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./actions/authActions";

interface UsersState {
  isLoggedIn: boolean,

  isLoading: boolean,
  error: boolean,
}


// initial state for logged in status
const initialState: UsersState = {
  isLoggedIn: false,

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
      .addCase(registerUser.fulfilled, handleFulfilled)
  }
})


const handlePending = (state: UsersState, action: PayloadAction) => {
  console.log(action?.payload)
  state.isLoading = true
  state.error = false
}

const handleFulfilled = (state: UsersState, action: Action) => {
  console.log(action)
  state.isLoading = false
  state.error = false
}

const handleRejected = (state: UsersState, action: Action) => {
  console.log(action)
  state.isLoading = false
  state.error = true
}

export default slice.reducer;