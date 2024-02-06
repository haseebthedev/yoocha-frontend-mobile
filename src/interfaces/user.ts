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

export interface UpdateUserI {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
}

export interface ChangePasswordI {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
