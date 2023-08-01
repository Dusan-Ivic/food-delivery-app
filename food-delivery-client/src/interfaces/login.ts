import { UserType } from "./enums";
import { UserState } from "./user";

export interface LoginRequestDto {
  username: string;
  password: string;
  userType: UserType;
}

export interface LoginResponseDto {
  user: UserState;
  token: string;
}
