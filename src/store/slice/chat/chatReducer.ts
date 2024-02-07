import { createSlice } from "@reduxjs/toolkit";
import { ChatI } from "./types";
import { getListMessageService, getListRoomsService } from "./chatService";

const initialState: ChatI = {
  loading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // For listing chat rooms
      .addCase(getListRoomsService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListRoomsService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getListRoomsService.rejected, (state, action) => {
        state.loading = false;
      })

      // For listing chat messages
      .addCase(getListMessageService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListMessageService.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(getListMessageService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
