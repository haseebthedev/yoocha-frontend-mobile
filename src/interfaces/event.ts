export interface SendFriendReqPayloadI {
  participants: { user: string | null; role: string | null }[];
}

export interface JoinRoomPayloadI {
  roomId: string | null;
  inviteeId: string | null;
}

export interface SendMessagePayloadI {
  chatRoomId: string | null;
  sender: string | null;
  message: string | null;
  link?: string | null;
  files?: string[] | null;
}
