import { StoreResponseDto } from "@/features/stores/types/response";
import { StateStatus } from "@/types/state";

export type StoresState = {
  stores: StoreResponseDto[];
  status: StateStatus;
  message: string;
};
