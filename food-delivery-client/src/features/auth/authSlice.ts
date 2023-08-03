import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import authService from "./authService";
import {
  ChangePasswordRequestDto,
  UserRequestDto,
  UserState,
} from "../../interfaces/user";
import { GrantType, StateStatus, UserType } from "../../interfaces/enums";
import { LoginRequestDto } from "../../interfaces/login";
import {
  CustomerRequestDto,
  CustomerResponseDto,
} from "../../interfaces/customer";
import {
  PartnerRequestDto,
  PartnerResponseDto,
} from "../../interfaces/partner";
import { convertByteArrayToBlob } from "../../utils/imageConverter";
import {
  CreateTokenRequestDto,
  DeleteTokenRequestDto,
} from "../../interfaces/token";

interface AuthState {
  user: UserState | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: StateStatus;
  message: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: StateStatus.None,
  message: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData: LoginRequestDto, thunkAPI) => {
    try {
      const requestDto: CreateTokenRequestDto = {
        grantType: GrantType.UsernamePassword,
        username: loginData.username,
        password: loginData.password,
        userType: loginData.userType,
      };
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

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      return await authService.getProfile(accessToken);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { accessToken, refreshToken } = (thunkAPI.getState() as RootState)
        .auth;
      const requestDto: DeleteTokenRequestDto = {
        refreshToken: refreshToken || "",
      };
      return await authService.deleteRefreshToken(requestDto, accessToken);
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
            accessToken
          );
        case UserType.Partner:
          return await authService.updatePartner(
            userId,
            userData as PartnerRequestDto,
            accessToken
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
      return await authService.uploadImage(formData, accessToken);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeImage = createAsyncThunk(
  "auth/remove-image",
  async (_, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      return await authService.removeImage(accessToken);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (passwordData: ChangePasswordRequestDto, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      return await authService.changePassword(passwordData, accessToken);
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
      .addCase(loginUser.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.message = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
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
        const userResponse = action.payload;
        state.user = {
          ...userResponse,
          imageData: convertByteArrayToBlob(userResponse.imageData),
        };
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
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = StateStatus.Success;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
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
            const customerResponse = action.payload as CustomerResponseDto;
            state.user = {
              ...customerResponse,
              imageData: convertByteArrayToBlob(customerResponse.imageData),
            };
            break;
          case UserType.Partner:
            const partnerResponse =
              action.payload as unknown as PartnerResponseDto;
            state.user = {
              ...partnerResponse,
              imageData: convertByteArrayToBlob(partnerResponse.imageData),
            };
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
          state.user.imageData = convertByteArrayToBlob(
            action.payload.imageData
          );
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
          state.user.imageData = null;
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
