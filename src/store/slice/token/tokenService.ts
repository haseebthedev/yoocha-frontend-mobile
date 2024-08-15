import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";
import { ListTokenPayloadI, ListTokenResponseI, SaveTokenPayloadI, SaveTokenResponseI } from "./types";

export const saveTokenService: any = createAsyncThunk(
  "token/saveToken",
  async (payload: SaveTokenPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SaveTokenResponseI> = await AxiosInstance.post(`/tokens/save-token`, {
        token: payload.token,
        userId: payload.userId,
      });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getTokensService: any = createAsyncThunk(
  "token/getTokens",
  async (payload: ListTokenPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListTokenResponseI> = await AxiosInstance.get(
        `/tokens/get-token?userId=${payload.userId}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
