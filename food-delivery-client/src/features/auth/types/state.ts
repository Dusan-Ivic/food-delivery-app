import { AdminResponseDto, CustomerResponseDto } from "@/features/auth/types/response";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { StateStatus } from "@/types/state";

type UserState = CustomerResponseDto | PartnerResponseDto | AdminResponseDto;

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
