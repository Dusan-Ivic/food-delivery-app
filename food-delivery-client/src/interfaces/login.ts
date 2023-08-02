import { UserType } from "./enums";
import { UserResponseDto } from "./user";

export interface LoginRequestDto {
  username: string;
  password: string;
  userType: UserType;
}

export interface LoginResponseDto {
  user: UserResponseDto;
  token: string;
}
