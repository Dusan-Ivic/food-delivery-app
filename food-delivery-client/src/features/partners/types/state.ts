import { PartnerResponseDto } from "@/features/partners/types/response";
import { StateStatus } from "@/interfaces/enums";

export type PartnersState = {
  partners: PartnerResponseDto[];
  status: StateStatus;
  message: string;
};
