export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  storeId: number;
  items: CartItem[];
}
