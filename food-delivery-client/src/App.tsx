import { Header } from "./components/ui/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Register,
  Store,
  Orders,
  Stores,
  PaymentStatus,
} from "./pages";
import { Dashboard } from "./layouts";
import { PrivateRoute } from "./components/ui/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getProfile, generateToken, reset } from "./features/auth/authSlice";
import { useEffect } from "react";
import { CreateTokenRequestDto } from "./interfaces/token";
import { GrantType } from "./interfaces/enums";
import { DeliveryLocationProvider } from "./context/location/DeliveryLocationContext";

function App() {
  const dispatch = useAppDispatch();
  const { user, accessToken, refreshToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Mechanism for refreshing access token before it expires
    let expirationTimer: number | undefined;

    if (refreshToken && accessToken) {
      const expirationTimestamp = accessToken.issuedAt + accessToken.expiresIn;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const remainingTime = expirationTimestamp - currentTimestamp;

      const refreshThreshold = import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD;
      const setThreshold =
        remainingTime < refreshThreshold ? 0 : refreshThreshold;

      expirationTimer = setTimeout(() => {
        const requestDto: CreateTokenRequestDto = {
          grantType: GrantType.RefreshToken,
          refreshToken: refreshToken,
        };
        dispatch(generateToken(requestDto));
      }, (expirationTimestamp - currentTimestamp - setThreshold) * 1000);
    }

    return () => {
      clearTimeout(expirationTimer);
    };
  }, [refreshToken, accessToken]);

  useEffect(() => {
    if (refreshToken && !accessToken) {
      const requestDto: CreateTokenRequestDto = {
        grantType: GrantType.RefreshToken,
        refreshToken: refreshToken,
      };
      dispatch(generateToken(requestDto));
    }

    if (refreshToken && accessToken && !user) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [accessToken, refreshToken, user]);

  return (
    <DeliveryLocationProvider>
      <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
        <Header />
        <ToastContainer style={{ width: "40%" }} position="top-left" />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:id" element={<Store />} />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/payment" element={<PaymentStatus />} />
          </Routes>
        </Container>
      </div>
    </DeliveryLocationProvider>
  );
}

export default App;
