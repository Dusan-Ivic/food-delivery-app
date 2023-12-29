import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "@/interfaces/enums";
import { RootState } from "@/app/store";
import { UserType } from "@/features/auth/types/enums";
import productsService from "@/features/products/api";
import { ProductsState } from "@/features/products/types/state";
import { ProductRequestDto } from "@/features/products/types/request";
import { PartnerStatus } from "@/features/partners/types/enums";
import { PartnerResponseDto } from "@/features/partners/types/response";

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
  async (requestDto: ProductRequestDto, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await productsService.createProduct(requestDto, accessToken!.payload);
        }
      }
      return thunkAPI.rejectWithValue("You are not verified to perform this action!");
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
  async (product: { productId: number; requestDto: ProductRequestDto }, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await productsService.updateProduct(
            product.productId,
            product.requestDto,
            accessToken!.payload
          );
        }
      }
      return thunkAPI.rejectWithValue("You are not verified to perform this action!");
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
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await productsService.deleteProduct(productId, accessToken!.payload);
        }
      }
      return thunkAPI.rejectWithValue("You are not verified to perform this action!");
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "products/upload-image",
  async ({ productId, formData }: { productId: number; formData: FormData }, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await productsService.uploadImage(productId, formData, accessToken!.payload);
        }
      }
      return thunkAPI.rejectWithValue("You are not verified to perform this action!");
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
        state.products = state.products.filter((product) => product.id !== action.payload.id);
      })
      .addCase(uploadImage.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              image: action.payload.image,
            };
          }
          return product;
        });
      });
  },
});

export const productsSelector = (state: RootState) => state.products;
export const { reset, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
