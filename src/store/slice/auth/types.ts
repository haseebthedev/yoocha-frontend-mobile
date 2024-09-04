export interface UserI {
  profilePicture: string | null;
  firstname: string;
  lastname: string;
  email: string;
  isEmailVerified: boolean;
  _id: string;
  dateOfBirth: string | null;
  country: string | null;
  city?: string | null;
  createdAt: string;
  updatedAt: string;
  accountStatus?: boolean;
  isFriendReqSent?: boolean;
}

export interface AuthI {
  loading: boolean;
  user: UserI | null;
  token: UserI | null;
  error: string | null;
}

export interface SignupPayloadI {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface SignupResponseI {
  result: UserI;
}

export interface SigninPayloadI {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface SigninResponseI {
  result: {
    user: UserI;
    token: string;
  };
}

export type ForgetPasswordPayloadI = Pick<UserI, "email">;

export interface ForgetPasswordResponseI {
  result: {
    result: string;
  };
}

export interface UpdateUserPayloadI {
  profilePicture: string;
  firstname: string;
  lastname: string;
  country: string;
  dateOfBirth: string;
  accountStatus?: boolean;
  isFirstSignIn?: boolean;
}

export interface UpdateUserResponseI {
  result: UserI;
}
export interface ChangePasswordPayloadI {
  oldPassword: string;
  newPassword: string;
}

export type ChangePasswordResponseI = ForgetPasswordResponseI;
export type ContactUsResponseI = ChangePasswordResponseI;
export type deleteMyProfileResponseI = ChangePasswordResponseI;
export type getMyProfileResponseI = UpdateUserResponseI;
