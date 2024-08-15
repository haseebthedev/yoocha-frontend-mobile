import { createSlice } from "@reduxjs/toolkit";
import { LoadingI } from "./types";
import { getTokensService, saveTokenService } from "./tokenService";

const initialState: LoadingI = {
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
      })

      .addCase(getTokensService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTokensService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getTokensService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default tokenSlice.reducer;
