import { GrantType, UserType } from "./enums";

export interface CreateTokenRequestDto {
  grantType: GrantType;
  userType?: UserType;
  username?: string;
  password?: string;
  refreshToken?: string;
}

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface DeleteTokenRequestDto {
  refreshToken: string;
}
