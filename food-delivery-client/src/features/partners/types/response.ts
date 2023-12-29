import { UserResponseDto } from "@/features/auth/types/response";
import { PartnerStatus } from "@/features/partners/types/enums";

export type PartnerResponseDto = UserResponseDto & {
  status: PartnerStatus;
};
