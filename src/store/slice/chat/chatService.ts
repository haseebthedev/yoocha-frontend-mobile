import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { GetMessageListPayloadI, GetMessageListResponseI, ListRoomResponseI } from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getListRoomsService: any = createAsyncThunk("chat/getListRooms", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ListRoomResponseI> = await AxiosInstance.post(`/chat/list-rooms`, {});

    return response.data;
  } catch (error: any) {
    showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

    return rejectWithValue(error?.response?.data || "Something went wrong!");
  }
});

export const getListMessageService: any = createAsyncThunk(
  "chat/getListMessage",
  async (payload: GetMessageListPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<GetMessageListResponseI> = await AxiosInstance.post(
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
