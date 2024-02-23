import { UserI } from "../auth/types";

export interface ListChatRoomPayloadI {
  page?: number;
  limit?: number;
}

export interface ParticipantI {
  user: UserI;
  role: string;
}

export interface ListRoomItemI {
  _id: string;
  participants: ParticipantI[];
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

export interface BlockUserPayloadI {
  roomId: string;
  userIdToBlock: string;
}

export interface BlockUserResponseI {
  result: {
    message: string;
  };
}

export interface ListBlockedUsersPayloadI {
  page?: number;
  limit?: number;
}

export interface BlockedUserInfo {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  blockedBy: string;
  user: UserI;
}

export interface ListBlockedUsersResponseI {
  result: {
    docs: BlockedUserInfo[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface UnblockUserPayloadI {
  userId: string;
}

export interface UnblockUserResponseI {
  result: {
    message: string;
  };
}

export interface ListUserRequestsPayloadI {
  role: string;
  page?: number;
  limit?: number;
}

export type ListUserRequestsResponseI = ListBlockedUsersResponseI;
