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
  isFriendReqSent?: boolean;
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

export interface AuthI {
  loading: boolean;
  user: UserI | null;
  token: UserI | null;
  error: string | null;
}

export type SigninPayloadI = Pick<SignupPayloadI, "email" | "password">;

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
}

export interface UpdateUserResponseI {
  result: UserI;
}

export interface getMyProfileResponseI {
  result: UserI;
}

export interface ChangePasswordPayloadI {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponseI {
  result: {
    result: string;
  };
}

export type ContactUsResponseI = ChangePasswordResponseI;
