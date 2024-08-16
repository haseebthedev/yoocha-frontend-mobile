import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { showFlashMessage } from "utils/flashMessage";
import { SaveTokenPayloadI, SaveTokenResponseI } from "./types";
import AxiosInstance from "services/api/api";

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
