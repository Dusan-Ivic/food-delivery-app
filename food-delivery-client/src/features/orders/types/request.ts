import { Coordinate } from "@/types/geolocation";

export type OrderItemRequestDto = {
  productId: number;
  quantity: number;
};

export type OrderRequestDto = {
  storeId: number;
  address: string;
  coordinate: Coordinate;
  items: OrderItemRequestDto[];
};
