export interface ListRoomResponseI {
  result: {
    docs: {
      _id: string | null;
      participants: {
        user: string | null;
        role: string | null;
      }[];
      status: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    }[];
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: boolean | null;
    nextPage: boolean | null;
  };
}

export interface ChatI {
  loading: boolean;
  chatRooms: ListRoomResponseI;
  activeChatRoom: ListRoomResponseI["result"]["docs"] | null;
  pendingChatRoom: ListRoomResponseI["result"]["docs"] | null;
  chatMessages: null;
  error?: string | null;
  stack?: string | null;
}
