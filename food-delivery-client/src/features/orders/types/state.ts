import { OrderResponseDto } from "@/features/orders/types/response";
import { StateStatus } from "@/types/state";

export type OrdersState = {
  orders: OrderResponseDto[];
  status: StateStatus;
  message: string;
};
