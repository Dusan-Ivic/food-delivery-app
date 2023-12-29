export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Cart = {
  storeId: number;
  items: CartItem[];
};
