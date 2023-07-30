export interface CartItem {
  productId: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  storeId: number;
  items: CartItem[];
}
