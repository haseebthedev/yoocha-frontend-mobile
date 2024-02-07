export interface ListChatI {
  list: {
    _id: string | null;
    chatRoomId: string | null;
    sender: string | null;
    message: string | null;
    link: null;
    files: null;
    createdAt: string | null;
    updatedAt: string | null;
  }[];
  page: number;
  hasNext: boolean | null;
  listRefreshing: boolean | null;
}

export interface ListRoomsI {
  list: {
    _id: string | null;
    participants: {
      user: string | null;
      role: string | null;
    }[];
    status: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  }[];
  page: number;
  hasNext: boolean | null;
  listRefreshing: boolean | null;
}
