import { MessageType } from "store";

export interface SendFriendReqPayloadI {
  participants: { user: string; role: string }[];
}

export type CancelFriendReqPayloadI = SendFriendReqPayloadI;

export interface JoinRoomPayloadI {
  roomId: string;
  inviteeId: string;
}

export interface SendMessagePayloadI {
  chatRoomId: string;
  sender: string;
  message: string | null;
  link?: string | null;
  files?: string[] | null;
  type: MessageType;
}
