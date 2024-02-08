export interface SenderI {
  _id: string | null;
  profilePicture: null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  isEmailVerified: boolean | null;
  dateOfBirth: string | null;
  country: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface MessageI {
  _id: string | null;
  chatRoomId: string | null;
  sender: SenderI | null;
  message: string | null;
  link: null;
  files: null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ListChatI {
  list: MessageI[];
  page: number;
  hasNext: boolean | null;
  listRefreshing: boolean | null;
}

export interface UserI {
  _id: string | null;
  profilePicture: null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  isEmailVerified: false;
  dateOfBirth: string | null;
  country: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ListRoomItemI {
  _id: string;
  participants: {
    user: UserI | null;
    role: string | null;
  }[];
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ListRoomsI {
  list: ListRoomItemI[];
  page: number;
  hasNext: boolean | null;
  listRefreshing: boolean | null;
}
