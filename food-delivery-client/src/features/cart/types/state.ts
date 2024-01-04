import { CartItem } from "@/features/cart/types/request";

export type CartState = {
  storeId?: string;
  items: CartItem[];
};
