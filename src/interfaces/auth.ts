export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SigninFormValues {
  email: string;
  password: string;
}

export interface ForgetPasswordFormValues {
  email: string;
}

export interface ReportIssueFormI {
  name: string;
  email: string;
  message: string;
}
