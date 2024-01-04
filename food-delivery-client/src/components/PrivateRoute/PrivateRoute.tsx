import { useAuthUser } from "@/features/auth/hooks";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuthUser();

  return user != null ? children : <Navigate to="/login" />;
}
