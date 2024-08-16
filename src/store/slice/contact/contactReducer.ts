import { createSlice } from "@reduxjs/toolkit";

import { UserI } from "../auth/types";
import { InitialStateI } from "./types";
import {
  getExplorePeopleService,
  getFriendsSuggestionService,
  getSearchExploreService,
  removeFriendRequest,
  sendFriendRequest,
} from "./contactService";

const initialUser: UserI = {
  profilePicture: "" || null,
  firstname: "",
  lastname: "",
  email: "",
  isEmailVerified: false,
  _id: "",
  dateOfBirth: "" || null,
  country: "" || null,
  city: "" || null,
  createdAt: "",
  updatedAt: "",
  isFriendReqSent: false,
};

const initialResult = {
  docs: [initialUser],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const initialState: InitialStateI = {
  loading: false,
  friendSuggestions: { result: { ...initialResult } },
  explorePeople: { result: { ...initialResult } },
  searchExplorePeople: { result: { ...initialResult } },
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
        const friendSuggestionsWithReqSent = action.payload.result.docs.map((friend) => ({
          ...friend,
          isFriendReqSent: false,
        }));

        state.friendSuggestions = {
          ...action.payload.result,
          docs: friendSuggestionsWithReqSent,
        };
        state.loading = false;
      })
      .addCase(getFriendsSuggestionService.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getSearchExploreService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchExploreService.fulfilled, (state, action) => {
        // state.searchExplorePeople = action.payload.result;

        const explorePeopleWithReqSent = action.payload.result?.docs.map((friend) => ({
          ...friend,
          isFriendReqSent: false,
        }));

        if (action.payload.result.page == 1) {
          state.searchExplorePeople = {
            ...action.payload.result,
            docs: explorePeopleWithReqSent,
          };
        } else {
          state.searchExplorePeople = {
            ...action.payload.result,
            docs: [...(state.searchExplorePeople.docs || []), ...explorePeopleWithReqSent],
          };
        }

        state.loading = false;
      })
      .addCase(getSearchExploreService.rejected, (state, action) => {
        state.loading = false;
      })

      // For listing explore people
      .addCase(getExplorePeopleService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExplorePeopleService.fulfilled, (state, action) => {
        // state.explorePeople = action.payload.result;

        const explorePeopleWithReqSent = action.payload.result.docs.map((friend) => ({
          ...friend,
          isFriendReqSent: false,
        }));

        state.explorePeople = {
          ...action.payload.result,
          docs: explorePeopleWithReqSent,
        };

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

        state.friendSuggestions.docs &&
          (state.friendSuggestions.docs = state.friendSuggestions.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.explorePeople.docs &&
          (state.explorePeople.docs = state.explorePeople.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.searchExplorePeople.docs &&
          (state.searchExplorePeople.docs = state.searchExplorePeople.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.loading = false;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(removeFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFriendRequest.fulfilled, (state, action) => {
        const inviteeId = action.meta.arg.inviteeId;
        state.friendSuggestions.docs &&
          (state.friendSuggestions.docs = state.friendSuggestions.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: false } : friend
          ));

        state.explorePeople.docs &&
          (state.explorePeople.docs = state.explorePeople.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: false } : friend
          ));

        state.searchExplorePeople.docs &&
          (state.searchExplorePeople.docs = state.searchExplorePeople.docs.map((friend: UserI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: false } : friend
          ));

        state.loading = false;
      })
      .addCase(removeFriendRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default contactSlice.reducer;
