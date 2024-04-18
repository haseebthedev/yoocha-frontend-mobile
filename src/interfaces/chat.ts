export interface ListWithPagination<T> {
  list: T[];
  page: number;
  hasNext: boolean;
  listRefreshing: boolean;
}
