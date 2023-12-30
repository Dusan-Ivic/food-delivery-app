import { GrantType, UserType } from "@/features/auth/types/enums";

export type LoginRequestDto = {
  username: string;
  password: string;
  userType: UserType;
};

export type ChangePasswordRequestDto = {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
};

export type UserRequestDto = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type CreateTokenRequestDto = {
  grantType: GrantType;
  userType?: UserType;
  username?: string;
  password?: string;
  refreshToken?: string;
};

export type DeleteTokenRequestDto = {
  refreshToken: string;
};

export type RegisterRequestDto = UserRequestDto & {
  password: string;
  confirmPassword: string;
};
