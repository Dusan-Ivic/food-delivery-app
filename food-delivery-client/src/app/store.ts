import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices";
import storesReducer from "../features/stores/slices";
import productsReducer from "../features/products/slices";
import cartReducer from "../features/cart/slices";
import ordersReducer from "../features/orders/slices";
import partnersReducer from "../features/partners/slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storesReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    partners: partnersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
