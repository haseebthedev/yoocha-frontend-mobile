import { ItemType, MessageItemI, UserI } from "store";

export const createNewMessage = (
  sender: UserI,
  roomId: string,
  message: string,
  itemType: ItemType = "message"
): MessageItemI => {
  return {
    _id: `temp-${Date.now()}`,
    chatRoomId: roomId,
    createdAt: new Date().toISOString(),
    files: null,
    message,
    sender,
    updatedAt: new Date().toISOString(),
    status: "sending",
    itemType,
  };
};
