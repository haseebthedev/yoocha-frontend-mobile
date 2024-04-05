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
  status: string;
  initiator: UserI;
  invitee: UserI;
  blockedBy: null;
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

export interface SendMessagePayloadI {
  roomId: string;
  message: string;
}

export interface SendMessageResponseI {
  result: {
    chatRoomId: string;
    sender: string;
    message: string;
    files: string[] | null;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
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
    docs: UserI[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface BlockUserPayloadI {
  id: string;
}

export interface BlockUserResponseI {
  result: {
    status: string;
  };
}

export interface ListBlockedUsersPayloadI {
  page?: number;
  limit?: number;
}

export type SuggestedFriendsPayloadI = ListBlockedUsersPayloadI;

export interface BlockedUserInfo {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  blockedBy: string;
  initiator: UserI;
  invitee: UserI;
}

export interface UserInfo {
  _id: string;
  status: string;
  initiator: UserI;
  invitee: UserI;
  createdAt: string;
  updatedAt: string;
  blockedBy: string;
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
  id: string;
}

export interface UnblockUserResponseI {
  result: {
    message: string;
  };
}

export interface ListUserRequestsPayloadI {
  type: string;
  page?: number;
  limit?: number;
}

export interface ListUserRequestsResponseI {
  result: {
    docs: UserInfo[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export type ExplorePeoplePayloadI = ListBlockedUsersPayloadI;

export interface ExplorePeopleResponseI {
  result: {
    docs: UserI[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface sendFriendReqPayloadI {
  inviteeId: string;
}

export interface sendFriendReqResponseI {
  result: {
    status: string;
  };
}
