import { OrderResponseDto } from "@/features/orders/types/response";
import { StateStatus } from "@/interfaces/enums";

export type OrdersState = {
  orders: OrderResponseDto[];
  status: StateStatus;
  message: string;
};
