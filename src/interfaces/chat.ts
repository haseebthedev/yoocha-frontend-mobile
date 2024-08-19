import { NotificationI } from "store";

export interface ListWithPagination<T> {
  list: T[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}

export type NotificationListResponseI = ListWithPagination<NotificationI>;
