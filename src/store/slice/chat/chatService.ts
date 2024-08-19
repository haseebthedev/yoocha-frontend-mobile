import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  ListMessagePayloadI,
  ListMessageResponseI,
  ListChatRoomPayloadI,
  ListRoomResponseI,
  BlockUserPayloadI,
  BlockUserResponseI,
  ListBlockedUsersPayloadI,
  ListBlockedUsersResponseI,
  UnblockUserPayloadI,
  UnblockUserResponseI,
  ListUserRequestsPayloadI,
  ListUserRequestsResponseI,
  SendMessagePayloadI,
  SendMessageResponseI,
  AcceptFriendReqPayloadI,
  AcceptFriendReqResponseI,
} from "./types";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";

export const getListRoomsService: any = createAsyncThunk(
  "chat/getListRooms",
  async (payload: ListChatRoomPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListRoomResponseI> = await AxiosInstance.post(
        `/chat/list-rooms?page=${payload.page}&limit=${payload.limit}`
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const acceptFriendRequest: any = createAsyncThunk(
  "chat/acceptFriendRequest",
  async (payload: AcceptFriendReqPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<AcceptFriendReqResponseI> = await AxiosInstance.post(
        `/chat/accept-friend-req?roomId=${payload.roomId}`
      );

      showFlashMessage({ type: "success", message: `${response.data.result.status || "Request is Accepted!"}` });

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

export const sendMessageService: any = createAsyncThunk(
  "chat/sendMessageService",
  async (payload: SendMessagePayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SendMessageResponseI> = await AxiosInstance.post(`/chat/send-message`, {
        roomId: payload.roomId,
        payload: {
          message: payload.message,
          files: payload.files,
          type: payload.type,
        },
      });
      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const blockUserService: any = createAsyncThunk(
  "chat/blockUser",
  async (payload: BlockUserPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<BlockUserResponseI> = await AxiosInstance.patch(
        `/chat/block-user?id=${payload.id}`
      );

      showFlashMessage({ type: "success", message: response.data.result.status });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getBlockedUsersService: any = createAsyncThunk(
  "chat/getBlockedUsers",
  async (payload: ListBlockedUsersPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListBlockedUsersResponseI> = await AxiosInstance.get(
        `/chat/list-blocked-users?page=${payload.page}&limit=${payload.limit}`,
        {}
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const unblockUserService: any = createAsyncThunk(
  "chat/unblockUser",
  async (payload: UnblockUserPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<UnblockUserResponseI> = await AxiosInstance.patch(
        `/chat/unblock-user?id=${payload.id}`,
        {}
      );

      showFlashMessage({ type: "success", message: response.data.result.message });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getUsersRequestsService: any = createAsyncThunk(
  "chat/getUsersRequests",
  async (payload: ListUserRequestsPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ListUserRequestsResponseI> = await AxiosInstance.post(
        `/chat/list-user-requests?page=${payload.page}&limit=${payload.limit}`,
        {
          type: payload.type,
        }
      );

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
