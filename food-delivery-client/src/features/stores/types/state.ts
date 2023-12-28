import { StoreResponseDto } from "@/features/stores/types/response";
import { StateStatus } from "@/interfaces/enums";

export type StoresState = {
  stores: StoreResponseDto[];
  status: StateStatus;
  message: string;
};
