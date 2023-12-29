import { UserRequestDto } from "@/features/auth/types/request";
import { PartnerStatus } from "@/features/partners/types/enums";

export type PartnerRequestDto = UserRequestDto & {
  password: string;
  confirmPassword: string;
};

export type VerifyPartnerRequestDto = {
  status: PartnerStatus;
};
