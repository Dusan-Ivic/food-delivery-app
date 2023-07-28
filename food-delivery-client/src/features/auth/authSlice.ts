import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import authService from "./authService";
import { User } from "../../interfaces/user";
import { StateStatus } from "../../interfaces/state";
import { LoginFormData } from "../../interfaces/login";

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
  async (loginData: LoginFormData, thunkAPI) => {
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
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userType: action.payload.userType,
        };
        state.token = action.payload.token;
      });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
