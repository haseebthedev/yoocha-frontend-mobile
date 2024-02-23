import { BlockedUserInfo, ListRoomItemI, MessageItemI } from "store";

export interface ListMessageI {
  list: MessageItemI[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}

export interface ListRoomsI {
  list: ListRoomItemI[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}

export interface BlockedUsersI {
  list: BlockedUserInfo[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}

export type UserRequestsI = BlockedUsersI;
