import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import AxiosInstance from "services/api/api";
import {
  DeleteNotificationPayloadI,
  DeleteNotificationResponseI,
  GetNotificationPayloadI,
  GetNotificationResponseI,
  ListNotificationPayloadI,
  ListNotificationResponseI,
  NotificationPayloadI,
  NotificationResponseI,
  ReadNotificationPayloadI,
} from "./types";

export const createNotificationService: any = createAsyncThunk(
  "notification/createNotification",
  async (payload: NotificationPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<NotificationResponseI> = await AxiosInstance.post(
        `/notification/create-notification`,
        {
          message: payload.message,
          recipientId: payload.recipientId,
          senderId: payload.senderId,
        }
      );

      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const listNotificationService: any = createAsyncThunk(
  "notification/listNotification",
  async (payload: ListNotificationPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListNotificationResponseI> = await AxiosInstance.get(
        `/notification/list-notifications?page=${payload.page}&limit=${payload.limit}`
      );

      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getNotificationService: any = createAsyncThunk(
  "notification/getNotification",
  async (payload: GetNotificationPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<GetNotificationResponseI> = await AxiosInstance.get(`/notification/${payload.id}`);

      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const readNotificationService: any = createAsyncThunk(
  "notification/readNotification",
  async (payload: ReadNotificationPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListNotificationResponseI> = await AxiosInstance.patch(
        `/notification/${payload.id}/read`
      );

      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const deleteNotificationService: any = createAsyncThunk(
  "notification/deleteNotification",
  async (payload: DeleteNotificationPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<DeleteNotificationResponseI> = await AxiosInstance.delete(
        `/notification/${payload.id}`
      );

      return response.data;
    } catch (error: any) {
      console.log("error: ", error);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
