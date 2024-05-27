import { createSlice } from "@reduxjs/toolkit";
import { FriendI, InitialStateI } from "./types";
import {
  getExplorePeopleService,
  getFriendsSuggestionService,
  getSearchExploreService,
  sendFriendRequest,
} from "./contactService";

const initialUser: FriendI = {
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
  friendSuggestionsLoading: false,
  explorePeopleLoading: false,
  searchExplorePeopleLoading: false,
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
        state.friendSuggestionsLoading = true;
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
        state.friendSuggestionsLoading = false;
      })
      .addCase(getFriendsSuggestionService.rejected, (state, action) => {
        state.friendSuggestionsLoading = false;
      })

      .addCase(getSearchExploreService.pending, (state) => {
        state.searchExplorePeopleLoading = true;
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

        state.searchExplorePeopleLoading = false;
      })
      .addCase(getSearchExploreService.rejected, (state, action) => {
        state.searchExplorePeopleLoading = false;
      })

      // For listing explore people
      .addCase(getExplorePeopleService.pending, (state) => {
        state.explorePeopleLoading = true;
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

        state.explorePeopleLoading = false;
      })
      .addCase(getExplorePeopleService.rejected, (state, action) => {
        state.explorePeopleLoading = false;
      })

      .addCase(sendFriendRequest.pending, (state) => {
        state.explorePeopleLoading = true;
        state.friendSuggestionsLoading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        const inviteeId = action.meta.arg.inviteeId;

        state.friendSuggestions.docs &&
          (state.friendSuggestions.docs = state.friendSuggestions.docs.map((friend: FriendI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.explorePeople.docs &&
          (state.explorePeople.docs = state.explorePeople.docs.map((friend: FriendI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.searchExplorePeople.docs &&
          (state.searchExplorePeople.docs = state.searchExplorePeople.docs.map((friend: FriendI) =>
            friend._id === inviteeId ? { ...friend, isFriendReqSent: true } : friend
          ));

        state.explorePeopleLoading = false;
        state.friendSuggestionsLoading = false;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.explorePeopleLoading = false;
        state.friendSuggestionsLoading = false;
      });
  },
});

export default contactSlice.reducer;
