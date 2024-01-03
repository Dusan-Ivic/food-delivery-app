import { UserResponseDto } from "@/features/auth/types/response";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { StateStatus } from "@/types/state";

export type UserState = UserResponseDto | PartnerResponseDto;

export type AccessTokenState = {
  payload: string;
  issuedAt: number;
  expiresIn: number;
};

export type AuthState = {
  user: UserState | null;
  accessToken: AccessTokenState | null;
  refreshToken: string | null;
  status: StateStatus;
  message: string;
};
