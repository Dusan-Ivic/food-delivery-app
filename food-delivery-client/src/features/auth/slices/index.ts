import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import authService from "@/features/auth/api";
import { UserRequestDto, RegisterRequestDto } from "@/features/auth/types/request";
import { StateStatus } from "@/types/state";
import { AuthState } from "@/features/auth/types/state";
import { UserType } from "@/features/auth/types/enums";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { UserResponseDto } from "@/features/auth/types/response";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken"),
  status: StateStatus.None,
  message: "",
};

export const registerCustomer = createAsyncThunk(
  "auth/register-customer",
  async (registerData: RegisterRequestDto, thunkAPI) => {
    try {
      return await authService.registerCustomer(registerData);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerPartner = createAsyncThunk(
  "auth/register-partner",
  async (registerData: RegisterRequestDto, thunkAPI) => {
    try {
      return await authService.registerPartner(registerData);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (
    {
      userId,
      userType,
      userData,
    }: { userId: number; userType: UserType; userData: UserRequestDto },
    thunkAPI
  ) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;

      switch (userType) {
        case UserType.Customer:
          return await authService.updateCustomer(userId, userData, accessToken!.payload);
        case UserType.Partner:
          return await authService.updatePartner(userId, userData, accessToken!.payload);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.None;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.message = `Customer ${action.payload.username} successfully registered`;
      })
      .addCase(registerPartner.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(registerPartner.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(registerPartner.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.message = `Partner ${action.payload.username} successfully registered`;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        switch (state.user?.userType) {
          case UserType.Customer:
            state.user = action.payload as UserResponseDto;
            break;
          case UserType.Partner:
            state.user = action.payload as PartnerResponseDto;
            break;
        }
      });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
