import { PartnerResponseDto } from "@/features/partners/types/response";
import { StateStatus } from "@/types/state";

export type PartnersState = {
  partners: PartnerResponseDto[];
  status: StateStatus;
  message: string;
};
