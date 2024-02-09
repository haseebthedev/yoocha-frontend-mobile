import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  GetFriendsSuggestionResponseI,
  ListMessagePayloadI,
  ListMessageResponseI,
  ListChatRoomPayloadI,
  ListRoomResponseI,
} from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getListRoomsService: any = createAsyncThunk(
  "chat/getListRooms",
  async (payload: ListChatRoomPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListRoomResponseI> = await AxiosInstance.post(
        `/chat/list-rooms?page=${payload.page}&limit=${payload.limit}`,
        {}
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getListMessageService: any = createAsyncThunk(
  "chat/getListMessage",
  async (payload: ListMessagePayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListMessageResponseI> = await AxiosInstance.post(
        `/chat/list-messages?page=${payload.page}&limit=${payload.limit}`,
        {
          roomId: payload.roomId,
        }
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getFriendsSuggestionService: any = createAsyncThunk(
  "chat/getFriendsSuggestion",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<GetFriendsSuggestionResponseI> = await AxiosInstance.get(
        `/chat/friend-suggestions`,
        {}
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
