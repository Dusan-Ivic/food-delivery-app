import { UserType } from "./user";

export interface LoginFormData {
  username: string;
  password: string;
  userType: UserType;
}

export interface LoginResponseDto {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  token: string;
  partnerStatus?: number;
}
