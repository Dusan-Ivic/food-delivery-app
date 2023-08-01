import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../interfaces/enums";
import { RootState } from "../../app/store";
import { ProductRequestDto, ProductState } from "../../interfaces/product";
import productsService from "./productsService";

interface ProductsState {
  products: ProductState[];
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

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: ProductRequestDto, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).auth;
      return await productsService.createProduct(productData, token);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: { data: ProductRequestDto; productId: number }, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).auth;
      return await productsService.updateProduct(
        product.productId,
        product.data,
        token
      );
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: number, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).auth;
      return await productsService.deleteProduct(productId, token);
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
      })
      .addCase(createProduct.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.products.push(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      });
  },
});

export const productsSelector = (state: RootState) => state.products;
export const { reset, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
