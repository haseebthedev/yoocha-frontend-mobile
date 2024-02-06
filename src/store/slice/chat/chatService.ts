import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ListRoomResponseI } from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getListRoomsService: any = createAsyncThunk("chat/getListRooms", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ListRoomResponseI> = await AxiosInstance.post(`/chat/list-rooms`, {});

    console.log("chat room === ", response.data.result.docs);

    //   showFlashMessage({ type: "success", message: "Signup Successfully!" });

    return response.data;
  } catch (error: any) {
    showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

    return rejectWithValue(error?.response?.data || "Something went wrong!");
  }
});
