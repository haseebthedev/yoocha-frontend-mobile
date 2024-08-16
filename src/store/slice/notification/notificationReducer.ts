import { createSlice } from "@reduxjs/toolkit";

import {
  deleteNotificationService,
  getNotificationService,
  listNotificationService,
  readNotificationService,
} from "./notificationService";
import { LoadingI } from "../chat/types";

const initialState: LoadingI = {
  loading: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(listNotificationService.pending, (state) => {
        state.loading = true;
      })
      .addCase(listNotificationService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(listNotificationService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(readNotificationService.pending, (state) => {
        state.loading = true;
      })
      .addCase(readNotificationService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(readNotificationService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(deleteNotificationService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotificationService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteNotificationService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getNotificationService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getNotificationService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default notificationSlice.reducer;
