import { createSlice } from "@reduxjs/toolkit";
import {
  changePasswordService,
  forgetPasswordService,
  getMyProfileService,
  signinService,
  signupService,
  updateUserService,
} from "./authService";
import { AuthI } from "./types";

const initialState: AuthI = {
  loading: false,
  user: null,
  error: null,
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
      })
      .addCase(forgetPasswordService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
      })
      .addCase(updateUserService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyProfileService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProfileService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
      })
      .addCase(getMyProfileService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changePasswordService.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changePasswordService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
