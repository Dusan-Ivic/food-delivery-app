import { RouteObject } from "react-router-dom";
import App from "@/App";
import { Home } from "@/features/home";
import { PrivateRoute } from "@/components";
import { Register, Login, Profile } from "@/features/auth";
import { Stores, Store } from "@/features/stores";
import { Orders, PaymentStatus } from "@/features/orders";
import { Dashboard } from "@/features/dashboard";

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
