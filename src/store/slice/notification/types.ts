import { UserI } from "../auth/types";
import { NotificationEnum } from "enums";
import { PaginationListResultI } from "../chat/types";

export interface NotificationResponseI {
  result: {
    message: string;
    type: NotificationEnum;
    from: string;
    to: string;
    status: string;
    isRead: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface NotificationI {
  message: string;
  type: NotificationEnum;
  from: UserI;
  to: UserI;
  status: string;
  isRead: boolean;
  _id: string;
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
