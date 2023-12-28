import { UserType } from "@/features/auth/types/enums";

export type UserResponseDto = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  image: string | null;
};

export type TokenResponseDto = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  issuedAt: number;
};
