import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  GetFriendsSuggestionResponseI,
  ExplorePeopleResponseI,
  ExplorePeoplePayloadI,
  SuggestedFriendsPayloadI,
  sendFriendReqPayloadI,
  sendFriendReqResponseI,
  RemoveFriendReqPayloadI,
  RemoveFriendReqResponseI,
} from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getFriendsSuggestionService: any = createAsyncThunk(
  "contact/getFriendsSuggestion",
  async (payload: SuggestedFriendsPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<GetFriendsSuggestionResponseI> = await AxiosInstance.get(
        `/chat/friend-suggestions?page=${payload.page}&limit=${payload.limit}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getSearchExploreService: any = createAsyncThunk(
  "contact/getSearchExplore",
  async (payload: ExplorePeoplePayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ExplorePeopleResponseI> = await AxiosInstance.get(
        `/chat/explore-people?page=${payload.page}&limit=${payload.limit}&name=${payload.name}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getExplorePeopleService: any = createAsyncThunk(
  "contact/getExplorePeople",
  async (payload: ExplorePeoplePayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ExplorePeopleResponseI> = await AxiosInstance.get(
        `/chat/explore-people?page=${payload.page}&limit=${payload.limit}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const sendFriendRequest: any = createAsyncThunk(
  "contact/sendFriendRequest",
  async (payload: sendFriendReqPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<sendFriendReqResponseI> = await AxiosInstance.post(
        `/chat/send-friend-req?inviteeId=${payload.inviteeId}`
      );

      showFlashMessage({ type: "success", message: `${response.data.result.status || "Request has been sent!"}` });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const removeFriendRequest: any = createAsyncThunk(
  "contact/removeFriendRequest",
  async (payload: RemoveFriendReqPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<RemoveFriendReqResponseI> = await AxiosInstance.get(
        `/chat/cancel-friend-req?inviteeId=${payload.inviteeId}`
      );

      showFlashMessage({ type: "success", message: `${response.data.result.status || "Request has been cancelled!"}` });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
