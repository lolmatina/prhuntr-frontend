import type { User } from "@/entities/user/model";

export interface LoginCredentials {
  role_id: 2 | 3;
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  has_company: boolean | null;
  signed_offer: boolean;
  first_login_at: string | null;
  user: User;
}

export interface RegisterCredentials {
  role_id: 2 | 3;
  email: string;
  password: string;
  confirm_password: string;
}

export type Steps = "initial" | "employer" | "applicant";
