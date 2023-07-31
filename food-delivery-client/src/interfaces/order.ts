import { Product } from "./product";
import { Store } from "./store";

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
  product: Product;
}

export interface OrderResponseDto {
  id: number;
  createdAt: Date;
  customerId: number;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  storeId: number;
  store: Store;
  items: OrderItemResponseDto[];
}

export interface CreateOrderRequestDto extends OrderRequestDto {}

export interface CreateOrderResponseDto extends OrderResponseDto {}

export interface GetOrderResponseDto extends OrderResponseDto {}
