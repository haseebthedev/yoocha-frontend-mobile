import { UserI } from "../auth/types";

export interface ListChatRoomPayloadI {
  page?: number;
  limit?: number;
}

export interface ListRoomItemI {
  _id: string;
  participants: {
    user: UserI;
    role: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListRoomResponseI {
  result: {
    docs: ListRoomItemI[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ListMessagePayloadI {
  roomId: string;
  page?: number;
  limit?: number;
}

export interface MessageItemI {
  _id: string;
  chatRoomId: string;
  sender: UserI;
  message: string | null;
  link: null | null;
  files: null | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListMessageResponseI {
  result: {
    docs: MessageItemI[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface LoadingI {
  loading: boolean;
}

export interface GetFriendsSuggestionResponseI {
  result: {
    doc: UserI[];
  };
}
