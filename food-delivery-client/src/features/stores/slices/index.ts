import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PartnerStatus, StateStatus } from "@/interfaces/enums";
import { RootState } from "@/app/store";
import { UserType } from "@/features/auth/types/enums";
import { PartnerResponseDto } from "@/interfaces/partner";
import storesService from "@/features/stores/api";
import { StoresState } from "@/features/stores/types/state";
import { GetStoresRequestDto, StoreRequestDto } from "@/features/stores/types/request";

const initialState: StoresState = {
  stores: [],
  status: StateStatus.None,
  message: "",
};

export const getStores = createAsyncThunk(
  "stores/get-stores",
  async (requestDto: GetStoresRequestDto | undefined, thunkAPI) => {
    try {
      if (requestDto && requestDto.partnerId) {
        return await storesService.getStoresByPartner(requestDto.partnerId);
      } else if (requestDto && requestDto.coordinate) {
        return await storesService.getStoresInArea(requestDto.coordinate);
      } else {
        return await storesService.getStores();
      }
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createStore = createAsyncThunk(
  "stores/create",
  async (storeData: StoreRequestDto, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await storesService.createStore(storeData, accessToken!.payload);
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
  "stores/upload-image",
  async ({ storeId, formData }: { storeId: number; formData: FormData }, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await storesService.uploadImage(storeId, formData, accessToken!.payload);
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

export const updateStore = createAsyncThunk(
  "stores/update",
  async ({ storeId, requestDto }: { storeId: number; requestDto: StoreRequestDto }, thunkAPI) => {
    try {
      const { user } = (thunkAPI.getState() as RootState).auth;
      if (user?.userType === UserType.Partner) {
        const partner = user as PartnerResponseDto;
        if (partner.status === PartnerStatus.Accepted) {
          const { accessToken } = (thunkAPI.getState() as RootState).auth;
          return await storesService.updateStore(storeId, requestDto, accessToken!.payload);
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

export const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.None;
      state.message = "";
    },
    clearStores: (state) => {
      state.stores = [];
      state.status = StateStatus.None;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.stores = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.stores.push(action.payload);
      })
      .addCase(updateStore.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.stores = state.stores.map((store) => {
          if (store.id === action.payload.id) {
            return action.payload;
          }
          return store;
        });
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
        state.stores = state.stores.map((store) => {
          if (store.id === action.payload.id) {
            return {
              ...store,
              image: action.payload.image,
            };
          }
          return store;
        });
      });
  },
});

export const storesSelector = (state: RootState) => state.stores;
export const { reset, clearStores } = storesSlice.actions;
export default storesSlice.reducer;
