import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartItem } from "../../interfaces/cart";
import { Product } from "../../interfaces/product";

interface CartState {
  storeId: number | null;
  items: CartItem[];
}

const initialState: CartState = {
  storeId: null,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state, action: PayloadAction<number>) => {
      state.storeId = action.payload;
      state.items = [];
    },
    closeCart: (state) => {
      state.storeId = null;
      state.items = [];
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((x) => x.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const { openCart, closeCart, addToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
