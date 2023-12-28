import { StoreResponseDto } from "@/features/stores/types/response";
import { OrderStatus } from "./enums";
import { Coordinate } from "./geolocation";

export interface OrderItemRequestDto {
  productId: number;
  quantity: number;
}

export interface OrderItemResponseDto {
  productId: number;
  orderId: number;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
  productImage: string | null;
}

export interface OrderBase {
  storeId: number;
  coordinate: Coordinate;
  address: string;
}

export interface OrderRequestDto extends OrderBase {
  items: OrderItemRequestDto[];
}

export interface OrderResponseDto extends OrderBase {
  id: number;
  customerId: number;
  store: StoreResponseDto;
  createdAt: Date;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  items: OrderItemResponseDto[];
}

export interface OrderItemState {
  productId: number;
  orderId: number;
  quantity: number;
  totalPrice: number;
  productName: string;
  productPrice: number;
  productImage: string | null;
}

export interface OrderState extends OrderBase {
  id: number;
  customerId: number;
  store: StoreResponseDto;
  createdAt: Date;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  items: OrderItemState[];
}

export interface CheckoutResponseDto {
  order: OrderResponseDto;
  sessionUrl: string;
}
