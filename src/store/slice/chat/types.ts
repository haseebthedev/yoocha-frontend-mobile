import { UserI } from "../auth/types";

export interface PaginationListResultI<T> {
  result: {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ResponseWithStatus {
  result: {
    status: string;
  };
}

export interface ListChatRoomPayloadI {
  page?: number;
  limit?: number;
}

export interface ListRoomItemI {
  _id: string;
  status: string;
  initiator: UserI;
  invitee: UserI;
  blockedBy: null;
  createdAt: string;
  updatedAt: string;
  lastMessage: string | null;
}

export type ListRoomResponseI = PaginationListResultI<ListRoomItemI>;
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
    _id: string;
    chatRoomId: string;
    sender: string;
    message: string;
    files: string[] | null;
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

export type ListMessageResponseI = PaginationListResultI<MessageItemI>;
export interface LoadingI {
  loading: boolean;
}

export type GetFriendsSuggestionResponseI = PaginationListResultI<UserI>;

export interface BlockUserPayloadI {
  id: string;
}

export type BlockUserResponseI = ResponseWithStatus;

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

export type ListBlockedUsersResponseI = PaginationListResultI<BlockedUserInfo>;

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

export type ExplorePeoplePayloadI = ListBlockedUsersPayloadI;

export type ListUserRequestsResponseI = PaginationListResultI<UserInfo>;
export type ExplorePeopleResponseI = PaginationListResultI<UserI>;

export interface sendFriendReqPayloadI {
  inviteeId: string;
}

export type sendFriendReqResponseI = ResponseWithStatus;
export type RemoveFriendReqPayloadI = Pick<sendFriendReqPayloadI, "inviteeId">;
export type RemoveFriendReqResponseI = ResponseWithStatus;

export interface AcceptFriendReqPayloadI {
  roomId: string;
}

export type AcceptFriendReqResponseI = ResponseWithStatus;
