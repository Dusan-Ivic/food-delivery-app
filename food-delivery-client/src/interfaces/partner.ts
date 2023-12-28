import { UserRequestDto } from "@/features/auth/types/request";
import { UserResponseDto } from "@/features/auth/types/response";
import { PartnerStatus } from "@/interfaces/enums";

export type PartnerRequestDto = UserRequestDto & {
  password: string;
  confirmPassword: string;
};

export type PartnerResponseDto = UserResponseDto & {
  status: PartnerStatus;
};

export type VerifyPartnerRequestDto = {
  status: PartnerStatus;
};
