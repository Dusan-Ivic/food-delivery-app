import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  return user != null ? children : <Navigate to="/login" />;
}
