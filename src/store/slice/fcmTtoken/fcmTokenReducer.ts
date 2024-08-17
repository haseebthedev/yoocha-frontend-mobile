import { createSlice } from "@reduxjs/toolkit";

import { FcmTokenSliceI } from "./types";
import { removeFcmTokenService, saveFcmTokenService } from "./fcmTokenService";

const initialState: FcmTokenSliceI = {
  loading: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveFcmTokenService.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFcmTokenService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveFcmTokenService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(removeFcmTokenService.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFcmTokenService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeFcmTokenService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default tokenSlice.reducer;
