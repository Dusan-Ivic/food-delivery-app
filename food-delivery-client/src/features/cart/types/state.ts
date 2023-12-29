import { CartItem } from "@/features/cart/types/request";

export type CartState = {
  storeId: number | null;
  items: CartItem[];
};
