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

export interface GetMessageListPayloadI {
  roomId: string | null;
  page?: number | null;
  limit?: number | null;
}

export interface MessageList {
  docs: {
    _id: string | null;
    chatRoomId: string | null;
    sender: string | null;
    message: string | null;
    link: null;
    files: null;
    createdAt: string | null;
    updatedAt: string | null;
  }[];
}

export interface GetMessageListResponseI {
  result: {
    docs: MessageList["docs"];
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: null;
    nextPage: null;
  };
}

export interface ChatI {
  loading: boolean;
}
