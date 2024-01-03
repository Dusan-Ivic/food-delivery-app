import { AuthUserContext } from "@/features/auth/context";
import { useContext } from "react";

export function useAuthUser() {
  return useContext(AuthUserContext);
}
