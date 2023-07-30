import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../interfaces/state";
import { RootState } from "../../app/store";
import { Product } from "../../interfaces/product";
import productsService from "./productsService";

interface ProductsState {
  products: Product[];
  status: StateStatus;
  message: string;
}

const initialState: ProductsState = {
  products: [],
  status: StateStatus.None,
  message: "",
};

export const getProductsByStore = createAsyncThunk(
  "products/get-by-store",
  async (storeId: number, thunkAPI) => {
    try {
      return await productsService.getProductsByStore(storeId);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.None;
      state.message = "";
    },
    clearProducts: (state) => {
      state.products = [];
      state.status = StateStatus.None;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByStore.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(getProductsByStore.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(getProductsByStore.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.products = action.payload;
      });
  },
});

export const productsSelector = (state: RootState) => state.products;
export const { reset, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
