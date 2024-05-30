import { UserI } from "../auth/types";
import { PaginationListResultI, ResponseWithStatus } from "../chat/types";

export interface InitialStateI {
  loading: boolean;
  friendSuggestions: PaginationListResultI<UserI>;
  explorePeople: PaginationListResultI<UserI>;
  searchExplorePeople: PaginationListResultI<UserI>;
}

export type GetFriendsSuggestionResponseI = PaginationListResultI<UserI>;

export interface PayloadI {
  page?: number;
  limit?: number;
  name?: string;
}

export type SuggestedFriendsPayloadI = PayloadI;
export type ExplorePeoplePayloadI = PayloadI;
export type ExplorePeopleResponseI = PaginationListResultI<UserI>;

export interface sendFriendReqPayloadI {
  inviteeId: string;
}

export type sendFriendReqResponseI = ResponseWithStatus;

export type RemoveFriendReqPayloadI = Pick<sendFriendReqPayloadI, "inviteeId">;
export type RemoveFriendReqResponseI = ResponseWithStatus;
