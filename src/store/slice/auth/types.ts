export interface UserI {
  profilePicture: string;
  firstname: string;
  lastname: string;
  email: string;
  isEmailVerified: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
  firstname: string;
  lastname: string;
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
