import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartItem } from "../../interfaces/cart";
import { ProductState } from "../../interfaces/product";

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
    clearCartItems: (state) => {
      state.items = [];
    },
    closeCart: (state) => {
      state.storeId = null;
      state.items = [];
    },
    addToCart: (state, action: PayloadAction<ProductState>) => {
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
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      state.items = updatedItems.filter((item) => item.quantity > 0);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const {
  openCart,
  closeCart,
  clearCartItems,
  addToCart,
  removeFromCart,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
