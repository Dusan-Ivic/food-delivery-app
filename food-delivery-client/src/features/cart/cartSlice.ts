import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cart } from "../../interfaces/cart";

interface CartState {
  cart: Cart | null;
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state, action) => {
      state.cart = {
        storeId: action.payload,
        items: [],
      };
    },
    closeCart: (state) => {
      state.cart = null;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
