import { UserState } from "@/features/auth/types/state";
import { createContext, useState } from "react";

type AuthUserContextType = {
  user: UserState | null;
};

export const AuthUserContext = createContext<AuthUserContextType>({} as AuthUserContextType);

interface AuthUserProviderProps {
  children: React.ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const [user] = useState<UserState | null>(null);

  return <AuthUserContext.Provider value={{ user }}>{children}</AuthUserContext.Provider>;
}
