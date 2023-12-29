import { PartnerResponseDto } from "@/features/partners/types/response";
import { AdminResponseDto } from "@/interfaces/admin";
import { CustomerResponseDto } from "@/interfaces/customer";
import { StateStatus } from "@/interfaces/enums";

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
