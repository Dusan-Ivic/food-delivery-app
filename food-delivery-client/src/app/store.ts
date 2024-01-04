import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices";
import partnersReducer from "@/features/partners/slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    partners: partnersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
