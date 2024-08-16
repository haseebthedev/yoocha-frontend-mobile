import { createSlice } from "@reduxjs/toolkit";

import { TokenSliceI } from "./types";
import { saveTokenService } from "./tokenService";

const initialState: TokenSliceI = {
  loading: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveTokenService.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTokenService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveTokenService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default tokenSlice.reducer;
