import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import authService from "@/features/auth/api";
import {
  ChangePasswordRequestDto,
  UserRequestDto,
  CreateTokenRequestDto,
  DeleteTokenRequestDto,
  CustomerRequestDto,
} from "@/features/auth/types/request";
import { StateStatus } from "@/types/state";
import { AuthState } from "@/features/auth/types/state";
import { UserType } from "@/features/auth/types/enums";
import { PartnerRequestDto } from "@/features/partners/types/request";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { CustomerResponseDto } from "@/features/auth/types/response";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken"),
  status: StateStatus.None,
  message: "",
};

export const generateToken = createAsyncThunk(
  "auth/login",
  async (requestDto: CreateTokenRequestDto, thunkAPI) => {
    try {
      return await authService.generateToken(requestDto);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
  try {
    const { accessToken } = (thunkAPI.getState() as RootState).auth;
    return await authService.getProfile(accessToken!.payload);
  } catch (error: unknown) {
    let message: string = "";
    if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { accessToken, refreshToken } = (thunkAPI.getState() as RootState).auth;
    const requestDto: DeleteTokenRequestDto = {
      refreshToken: refreshToken || "",
    };
    return await authService.deleteRefreshToken(requestDto, accessToken!.payload);
  } catch (error: unknown) {
    let message: string = "";
    if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const registerCustomer = createAsyncThunk(
  "auth/register-customer",
  async (registerData: CustomerRequestDto, thunkAPI) => {
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
  async (registerData: PartnerRequestDto, thunkAPI) => {
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
          return await authService.updateCustomer(
            userId,
            userData as CustomerRequestDto,
            accessToken!.payload
          );
        case UserType.Partner:
          return await authService.updatePartner(
            userId,
            userData as PartnerRequestDto,
            accessToken!.payload
          );
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

export const uploadImage = createAsyncThunk(
  "auth/upload-image",
  async (formData: FormData, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      return await authService.uploadImage(formData, accessToken!.payload);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeImage = createAsyncThunk("auth/remove-image", async (_, thunkAPI) => {
  try {
    const { accessToken } = (thunkAPI.getState() as RootState).auth;
    return await authService.removeImage(accessToken!.payload);
  } catch (error: unknown) {
    let message: string = "";
    if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (passwordData: ChangePasswordRequestDto, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      return await authService.changePassword(passwordData, accessToken!.payload);
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
      .addCase(generateToken.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.message = action.payload as string;
        localStorage.removeItem("refreshToken");
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.accessToken = {
          payload: action.payload.accessToken,
          issuedAt: action.payload.issuedAt,
          expiresIn: action.payload.expiresIn,
        };
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(getProfile.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.message = action.payload as string;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.message = action.payload as string;
        localStorage.removeItem("refreshToken");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = StateStatus.Success;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem("refreshToken");
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
            state.user = action.payload as CustomerResponseDto;
            break;
          case UserType.Partner:
            state.user = action.payload as PartnerResponseDto; // as unknown
            break;
        }
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
        if (state.user) {
          state.user.image = action.payload.image;
        }
      })
      .addCase(removeImage.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(removeImage.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(removeImage.fulfilled, (state) => {
        state.status = StateStatus.Success;
        if (state.user) {
          state.user.image = null;
        }
      })
      .addCase(changePassword.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.message = action.payload as string;
      });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const { reset } = authSlice.actions;
export default authSlice.reducer;
