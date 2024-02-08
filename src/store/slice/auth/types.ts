export interface SignupPayloadI {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
}

export interface SignupResponseI {
  result: {
    profilePicture: string | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    isEmailVerified: boolean | null;
    _id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
}

export interface AuthI {
  loading: boolean;
  user: SignupResponseI["result"] | null;
  error?: string | null;
  stack?: string | null;
}

export interface SigninPayloadI {
  email: string | null;
  password: string | null;
}

export interface SigninResponseI {
  result: {
    user: {
      profilePicture: string | null;
      firstname: string | null;
      lastname: string | null;
      email: string | null;
      isEmailVerified: boolean | null;
      _id: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    };

    token: string | null;
  };
}

export interface ForgetPasswordPayloadI {
  email: string | null;
}

export interface ForgetPasswordResponseI {
  result: {
    result: string | null;
  };
}

export interface UpdateUserPayloadI {
  firstName: string | null;
  lastName: string | null;
}

export interface UpdateUserResponseI {
  result: {
    profilePicture: string | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    isEmailVerified: boolean | null;
    _id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
}

export interface getMyProfileResponseI {
  result: {
    profilePicture: string | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    isEmailVerified: boolean | null;
    _id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
}

export interface ChangePasswordPayloadI {
  oldPassword: string | null;
  newPassword: string | null;
}

export interface ChangePasswordResponseI {
  result: {
    result: string | null;
  };
}
