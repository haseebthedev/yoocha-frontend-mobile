import { createSlice } from "@reduxjs/toolkit";
import { LoadingI } from "./types";
import {
  blockUserService,
  getBlockedUsersService,
  getFriendsSuggestionService,
  getListMessageService,
  getListRoomsService,
} from "./chatService";

const initialState: LoadingI = {
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
      })

      // For listing Friends Suggestion
      .addCase(getFriendsSuggestionService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriendsSuggestionService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getFriendsSuggestionService.rejected, (state, action) => {
        state.loading = false;
      })

      // For block user
      .addCase(blockUserService.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUserService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(blockUserService.rejected, (state, action) => {
        state.loading = false;
      })

      // For list block user
      .addCase(getBlockedUsersService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlockedUsersService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getBlockedUsersService.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
