import { UserInfo } from "store";

export interface UserRequestsI {
  list: UserInfo[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}

export interface ListWithPagination<T> {
  list: T[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}
