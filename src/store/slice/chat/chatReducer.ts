import { createSlice } from "@reduxjs/toolkit";
import { ChatI } from "./types";
import { getListRoomsService } from "./chatService";

const initialState: ChatI = {
  loading: false,
  chatRooms: {
    result: {
      docs: [
        {
          _id: null,
          participants: [
            {
              user: null,
              role: null,
            },
          ],
          status: null,
          createdAt: null,
          updatedAt: null,
        },
      ],
      totalDocs: null,
      limit: null,
      totalPages: null,
      page: null,
      pagingCounter: null,
      hasPrevPage: null,
      hasNextPage: null,
      prevPage: null,
      nextPage: null,
    },
  },
  activeChatRoom:
    [
      {
        _id: null,
        participants: [
          {
            user: null,
            role: null,
          },
        ],
        status: null,
        createdAt: null,
        updatedAt: null,
      },
    ] || null,
  pendingChatRoom:
    [
      {
        _id: null,
        participants: [
          {
            user: null,
            role: null,
          },
        ],
        status: null,
        createdAt: null,
        updatedAt: null,
      },
    ] || null,
  chatMessages: null,
  error: null,
  stack: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getListRoomsService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListRoomsService.fulfilled, (state, action) => {
        console.log("action.payload.result === ", action.payload.result.docs);
        state.loading = false;
        state.chatRooms = action.payload.result;
        state.activeChatRoom = action.payload.result.docs.filter((item) => item.status === "ACTIVE");
        state.pendingChatRoom = action.payload.result.docs.filter((item) => item.status === "PENDING");
      })
      .addCase(getListRoomsService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
