import { UserType } from "./enums";
import { User } from "./user";

export interface LoginRequestDto {
  username: string;
  password: string;
  userType: UserType;
}

export interface LoginResponseDto {
  user: User;
  token: string;
}
