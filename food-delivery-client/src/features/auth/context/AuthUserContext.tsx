import { AccessTokenState, UserState } from "@/features/auth/types/state";
import { createContext, useEffect, useState } from "react";
import { LoginRequestDto } from "../types/request";
import authService from "@/features/auth/api";
import { GrantType } from "@/features/auth/types/enums";
import { useLocalStorage } from "@/hooks";

type AuthUserContextType = {
  user: UserState | null;
  login: (data: LoginRequestDto) => void;
  logout: () => void;
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

  return (
    <AuthUserContext.Provider value={{ user, login, logout }}>{children}</AuthUserContext.Provider>
  );
}
