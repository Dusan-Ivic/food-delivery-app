import { AccessTokenState, UserState } from "@/features/auth/types/state";
import { createContext, useEffect, useState } from "react";
import {
  ChangePasswordRequestDto,
  LoginRequestDto,
  UserRequestDto,
} from "@/features/auth/types/request";
import authService from "@/features/auth/api";
import { GrantType } from "@/features/auth/types/enums";
import { useLocalStorage } from "@/hooks";
import { toast } from "react-toastify";

type AuthUserContextType = {
  user: UserState | null;
  accessToken: AccessTokenState | null;
  login: (data: LoginRequestDto) => void;
  logout: () => void;
  updateProfile: (data: UserRequestDto) => void;
  changePassword: (data: ChangePasswordRequestDto) => void;
  uploadImage: (data: FormData) => void;
  deleteImage: () => void;
};

export const AuthUserContext = createContext<AuthUserContextType>({} as AuthUserContextType);

interface AuthUserProviderProps {
  children: React.ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const [user, setUser] = useState<UserState | null>(null);
  const [accessToken, setAccessToken] = useState<AccessTokenState | null>(null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>("refreshToken", null);

  useEffect(() => {
    const getProfile = async (accessToken: string) => {
      const response = await authService.getProfile(accessToken);
      setUser(response);
    };

    if (accessToken) {
      getProfile(accessToken.payload);
    }
  }, [accessToken]);

  useEffect(() => {
    const getAccessToken = async (refreshToken: string) => {
      const response = await authService.generateToken({
        refreshToken: refreshToken,
        grantType: GrantType.RefreshToken,
      });

      setAccessToken({
        payload: response.accessToken,
        issuedAt: response.issuedAt,
        expiresIn: response.expiresIn,
      });
    };

    if (refreshToken) {
      getAccessToken(refreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    const getAccessToken = async (refreshToken: string) => {
      const response = await authService.generateToken({
        refreshToken: refreshToken,
        grantType: GrantType.RefreshToken,
      });

      setAccessToken({
        payload: response.accessToken,
        issuedAt: response.issuedAt,
        expiresIn: response.expiresIn,
      });
    };

    let expirationTimer: number | undefined;

    if (refreshToken && accessToken) {
      const expirationTimestamp = accessToken.issuedAt + accessToken.expiresIn;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const remainingTime = expirationTimestamp - currentTimestamp;

      const refreshThreshold = import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD;
      const setThreshold = remainingTime < refreshThreshold ? 0 : refreshThreshold;

      expirationTimer = setTimeout(() => {
        getAccessToken(refreshToken);
      }, (expirationTimestamp - currentTimestamp - setThreshold) * 1000);
    }

    return () => {
      clearTimeout(expirationTimer);
    };
  }, [accessToken, refreshToken]);

  const login = async (data: LoginRequestDto) => {
    const response = await authService.generateToken({
      ...data,
      grantType: GrantType.UsernamePassword,
    });

    setAccessToken({
      payload: response.accessToken,
      issuedAt: response.issuedAt,
      expiresIn: response.expiresIn,
    });

    setRefreshToken(response.refreshToken);
  };

  const logout = async () => {
    if (refreshToken && accessToken) {
      await authService.deleteRefreshToken({ refreshToken }, accessToken.payload);
    }
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const updateProfile = async (data: UserRequestDto) => {
    if (accessToken) {
      const response = await authService.updateProfile(data, accessToken.payload);
      setUser(response);
      toast.success("Your profile has been updated.");
    }
  };

  const changePassword = async (data: ChangePasswordRequestDto) => {
    if (accessToken) {
      await authService.changePassword(data, accessToken.payload);
      toast.success("Your password has been changed.");
    }
  };

  const uploadImage = async (formData: FormData) => {
    if (accessToken && user) {
      const response = await authService.uploadImage(formData, accessToken.payload);
      setUser({ ...user, image: response.image });
    }
  };

  const deleteImage = async () => {
    if (accessToken && user) {
      await authService.deleteImage(accessToken.payload);
      setUser({ ...user, image: null });
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        updateProfile,
        changePassword,
        uploadImage,
        deleteImage,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
