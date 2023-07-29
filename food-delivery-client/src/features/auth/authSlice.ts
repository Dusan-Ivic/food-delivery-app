import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import authService from "./authService";
import { User } from "../../interfaces/user";
import { StateStatus } from "../../interfaces/state";
import { LoginRequestDto } from "../../interfaces/login";
import { RegisterCustomerRequestDto } from "../../interfaces/customer";
import { RegisterPartnerRequestDto } from "../../interfaces/partner";

interface AuthState {
  user: User | null;
  token: string | null;
  status: StateStatus;
  message: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: StateStatus.None,
  message: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData: LoginRequestDto, thunkAPI) => {
    try {
      return await authService.loginUser(loginData);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerCustomer = createAsyncThunk(
  "auth/register-customer",
  async (registerData: RegisterCustomerRequestDto, thunkAPI) => {
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
  async (registerData: RegisterPartnerRequestDto, thunkAPI) => {
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.None;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = StateStatus.None;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.user = null;
        state.token = null;
        state.message = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
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
      });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
