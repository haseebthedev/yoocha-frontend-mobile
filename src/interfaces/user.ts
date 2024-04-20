import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";
import { UserI } from "store";

export interface UserStatusI {
  id: string;
  name: string;
  profilePic: string;
  date: string;
  statusImage: string;
}

export type UpdateUserI = Pick<UserI, "firstname" | "lastname" | "email">;

export interface ChangePasswordI {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserUpdateI {
  profilePicture?: string;
  firstname: string;
  lastname?: string;
  email: string;
  dateOfBirth?: Date;
  country?: string | TranslationLanguageCodeMap;
}
