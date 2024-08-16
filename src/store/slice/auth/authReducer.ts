import { createSlice } from "@reduxjs/toolkit";

import { AuthI } from "./types";
import {
  changePasswordService,
  contactUsService,
  deleteMyProfileService,
  forgetPasswordService,
  getMyProfileService,
  signinService,
  signupService,
  updateUserService,
} from "./authService";

const initialState: AuthI = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
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
        state.token = action.payload.result.token;
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
      })

      .addCase(contactUsService.pending, (state) => {
        state.loading = true;
      })
      .addCase(contactUsService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(contactUsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMyProfileService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMyProfileService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMyProfileService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
