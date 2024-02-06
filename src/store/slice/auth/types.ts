export interface SignupPayloadI {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
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
  stack?: string;
}

export interface SigninPayloadI {
  email: string;
  password: string;
}

export interface SigninResponseI {
  result: {
    user: {
      profilePicture: any;
      firstname: string;
      lastname: string;
      email: string;
      isEmailVerified: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };

    token: string;
  };
}

export interface ForgetPasswordPayloadI {
  email: string;
}

export interface ForgetPasswordResponseI {
  result: {
    result: string;
  };
}

export interface UpdateUserPayloadI {
  firstName: string;
  lastName: string;
}

export interface UpdateUserResponseI {
  result: {
    profilePicture: any;
    firstname: string;
    lastname: string;
    email: string;
    isEmailVerified: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface getMyProfileResponseI {
  result: {
    profilePicture: any;
    firstname: string;
    lastname: string;
    email: string;
    isEmailVerified: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
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
