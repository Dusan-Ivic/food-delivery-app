import { OrderStatus } from "./enums";
import { StoreResponseDto } from "./store";

export interface OrderItemRequestDto {
  productId: number;
  quantity: number;
}

export interface OrderItemResponseDto {
  productId: number;
  orderId: number;
  quantity: number;
  totalPrice: number;
  productName?: string;
  productPrice?: number;
}

export interface OrderRequestDto {
  storeId: number;
  items: OrderItemRequestDto[];
}

export interface OrderResponseDto {
  id: number;
  customerId: number;
  storeId: number;
  store: StoreResponseDto;
  createdAt: Date;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  items: OrderItemResponseDto[];
}
