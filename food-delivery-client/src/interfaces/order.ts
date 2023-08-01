import { StoreResponseDto } from "./store";

export enum OrderStatus {
  Pending = 0,
  Canceled = 1,
  Completed = 2,
}

export interface OrderItemRequestDto {
  productId: number;
  quantity: number;
}

export interface OrderRequestDto {
  storeId: number;
  items: OrderItemRequestDto[];
}

export interface OrderItemResponseDto {
  productId: number;
  quantity: number;
  totalPrice: number;
  orderId: number;
  productName: string;
  productPrice: number;
}

export interface OrderResponseDto {
  id: number;
  createdAt: Date;
  customerId: number;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  storeId: number;
  store: StoreResponseDto;
  items: OrderItemResponseDto[];
  orderStatus: OrderStatus;
}

export interface CreateOrderRequestDto extends OrderRequestDto {}

export interface CreateOrderResponseDto extends OrderResponseDto {}

export interface GetOrderResponseDto extends OrderResponseDto {}
