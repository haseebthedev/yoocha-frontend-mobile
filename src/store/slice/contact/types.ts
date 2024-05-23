import { UserI } from "../auth/types";
import { PaginationListResultI, ResponseWithStatus } from "../chat/types";

export interface FriendI {
  profilePicture: string | null;
  firstname: string;
  lastname: string;
  email: string;
  isEmailVerified: boolean;
  _id: string;
  dateOfBirth: string | null;
  country: string | null;
  city?: string | null;
  createdAt: string;
  updatedAt: string;
  isFriendReqSent: boolean;
}

export interface InitialStateI {
  loading: boolean;
  friendSuggestions: FriendI[];
  explorePeople: FriendI[];
}

export type GetFriendsSuggestionResponseI = PaginationListResultI<UserI>;

export interface PayloadI {
  page?: number;
  limit?: number;
}

export type SuggestedFriendsPayloadI = PayloadI;
export type ExplorePeoplePayloadI = PayloadI;
export type ExplorePeopleResponseI = PaginationListResultI<UserI>;

export interface sendFriendReqPayloadI {
  inviteeId: string;
}

export type sendFriendReqResponseI = ResponseWithStatus;
