import { UserI } from "../auth/types";
import { PaginationListResultI } from "../chat/types";

export interface NotificationPayloadI {
  message: string;
  recipientId: string;
  senderId: string;
}

export interface NotificationResponseI {
  result: {
    message: string;
    senderId: string;
    recipientId: string;
    isRead: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface NotificationI {
  _id: string;
  message: string;
  senderId: UserI;
  recipientId: UserI;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ListNotificationResponseI = PaginationListResultI<NotificationI>;

export interface ReadNotificationPayloadI {
  id: string;
}

export type GetNotificationPayloadI = ReadNotificationPayloadI;

export interface GetNotificationResponseI {
  result: NotificationI;
}

export type DeleteNotificationPayloadI = ReadNotificationPayloadI;

export interface DeleteNotificationResponseI {
  result: {
    message: string;
  };
}

export interface ListNotificationPayloadI {
  page?: number;
  limit?: number;
}
