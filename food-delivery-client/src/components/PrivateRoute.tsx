import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
  children: JSX.Element;
  sourcePage: string;
}

export function PrivateRoute({ children, sourcePage }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  sessionStorage.setItem("redirectTo", sourcePage);

  return user != null ? children : <Navigate to="/login" />;
}
