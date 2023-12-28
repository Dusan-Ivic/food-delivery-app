import { RouteObject } from "react-router-dom";
import App from "@/App";
import { Home, Orders, PaymentStatus, Store, Stores } from "@/pages";
import { Dashboard } from "@/layouts";
import { PrivateRoute } from "@/components/ui/PrivateRoute";
import { Register, Login, Profile } from "@/features/auth";

export const applicationRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/stores/:id",
        element: <Store />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <PaymentStatus />,
      },
    ],
  },
];
