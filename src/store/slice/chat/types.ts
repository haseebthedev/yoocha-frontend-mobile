export interface ListChatRoomPayloadI {
  page?: number | null;
  limit?: number | null;
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

export interface ListRoomResponseI {
  result: {
    docs: {
      _id: string | null;
      participants: {
        user: UserI | null;
        role: string | null;
      }[];
      status: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    }[];
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: boolean | null;
    nextPage: boolean | null;
  };
}

export interface GetMessageListPayloadI {
  roomId: string | null;
  page?: number | null;
  limit?: number | null;
}

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

export interface MessageList {
  _id: string | null;
  chatRoomId: string | null;
  sender: SenderI | null;
  message: string | null;
  link: null;
  files: null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetMessageListResponseI {
  result: {
    docs: MessageList[];
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: null;
    nextPage: null;
  };
}

export interface ChatI {
  loading: boolean;
}

export interface GetFriendsSuggestionResponseI {
  result: {
    docs: UserI[] | null;
  };
}
