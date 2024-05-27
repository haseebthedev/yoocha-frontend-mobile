import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  GetFriendsSuggestionResponseI,
  ExplorePeopleResponseI,
  ExplorePeoplePayloadI,
  SuggestedFriendsPayloadI,
  sendFriendReqPayloadI,
  sendFriendReqResponseI,
} from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getFriendsSuggestionService: any = createAsyncThunk(
  "chat/getFriendsSuggestion",
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
        `/chat/explore-people?page=${payload.page}&limit=${payload.limit}`
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
  "chat/sendFriendRequest",
  async (payload: sendFriendReqPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<sendFriendReqResponseI> = await AxiosInstance.get(
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
