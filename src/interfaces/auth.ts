export interface SignupI {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SigninI = Pick<SignupI, "email" | "password">;

export type ForgetPasswordI = Pick<SignupI, "email">;

export interface ReportIssueI {
  name: string;
  email: string;
  message: string;
}

export type ContactUsI = ReportIssueI;
