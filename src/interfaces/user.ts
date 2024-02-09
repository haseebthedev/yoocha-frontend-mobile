import { UserI } from "store";

export interface UserStatusI {
  id: string;
  name: string;
  profilePic: string;
  date: string;
  statusImage: string;
}

export type UpdateUserI = Pick<UserI, "firstname" | "lastname">;

export interface ChangePasswordI {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
