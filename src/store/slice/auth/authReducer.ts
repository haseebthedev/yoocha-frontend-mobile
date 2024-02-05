import { createSlice } from "@reduxjs/toolkit";
import { forgetPasswordService, signinService, signupService } from "./authService";
import { AuthI } from "./types";

const initialState: AuthI = {
  loading: false,
  user:
    {
      profilePicture: null,
      firstname: "",
      lastname: "",
      email: "",
      isEmailVerified: false,
      _id: "",
      createdAt: "",
      updatedAt: "",
    } || null,
  error: "",
  stack: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupService.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
      })
      .addCase(signupService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signinService.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result.user;
      })
      .addCase(signinService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(forgetPasswordService.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPasswordService.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.result.user;
      })
      .addCase(forgetPasswordService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
