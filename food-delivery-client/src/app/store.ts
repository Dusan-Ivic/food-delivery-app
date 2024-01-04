import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices";
import cartReducer from "@/features/cart/slices";
import partnersReducer from "@/features/partners/slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    partners: partnersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
