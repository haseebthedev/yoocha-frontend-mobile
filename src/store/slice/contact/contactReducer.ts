import { createSlice } from "@reduxjs/toolkit";
import { InitialStateI } from "./types";
import { getExplorePeopleService, getFriendsSuggestionService, sendFriendRequest } from "./contactService";

const initialState: InitialStateI = {
  loading: false,
  friendSuggestions: [],
  explorePeople: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // For listing Friends Suggestion
      .addCase(getFriendsSuggestionService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriendsSuggestionService.fulfilled, (state, action) => {
        state.friendSuggestions = action.payload.result || [];
        state.loading = false;
      })
      .addCase(getFriendsSuggestionService.rejected, (state, action) => {
        state.loading = false;
      })

      // For listing explore people
      .addCase(getExplorePeopleService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExplorePeopleService.fulfilled, (state, action) => {
        state.explorePeople = action.payload.result || [];
        state.loading = false;
      })
      .addCase(getExplorePeopleService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        const inviteeId = action.meta.arg.inviteeId;

        state.friendSuggestions = state.friendSuggestions.map((friend) =>
          friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
        );
        state.explorePeople = state.explorePeople.map((friend) =>
          friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
        );

        state.friendSuggestions = state.friendSuggestions.filter((item) => item._id !== inviteeId);
        state.explorePeople = state.explorePeople.filter((item) => item._id !== inviteeId);

        state.loading = false;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default contactSlice.reducer;
