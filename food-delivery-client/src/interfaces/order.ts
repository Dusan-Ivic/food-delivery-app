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
}

export interface OrderResponseDto {
  id: number;
  createdAt: Date;
  customerId: number;
  itemsPrice: number;
  deliveryFee: number;
  totalPrice: number;
  storeId: number;
  items: OrderItemResponseDto[];
}

export interface CreateOrderRequestDto extends OrderRequestDto {}

export interface CreateOrderResponseDto extends OrderResponseDto {}
