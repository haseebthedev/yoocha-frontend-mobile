import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { showFlashMessage } from "utils/flashMessage";
import { RemoveFcmTokenPayloadI, RemoveFcmTokenResponseI, SaveFcmTokenPayloadI, SaveFcmTokenResponseI } from "./types";
import AxiosInstance from "services/api/api";

export const saveFcmTokenService: any = createAsyncThunk(
  "token/saveToken",
  async (payload: SaveFcmTokenPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SaveFcmTokenResponseI> = await AxiosInstance.post(`/tokens/save-token`, {
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

export const removeFcmTokenService: any = createAsyncThunk(
  "token/removeToken",
  async (payload: RemoveFcmTokenPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<RemoveFcmTokenResponseI> = await AxiosInstance.delete(
        `/tokens/remove-token?userId=${payload.userId}&token=${payload.token}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
