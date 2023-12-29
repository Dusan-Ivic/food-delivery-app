import { OrderStatus } from "@/features/orders/types/enums";
import { StoreResponseDto } from "@/features/stores/types/response";

export type OrderItemResponseDto = {
  productId: number;
  orderId: number;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
  productImage: string | null;
};

export type OrderResponseDto = {
  id: number;
  customerId: number;
  store: StoreResponseDto;
  address: string;
  createdAt: Date;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  items: OrderItemResponseDto[];
};

export type CheckoutResponseDto = {
  order: OrderResponseDto;
  sessionUrl: string;
};
