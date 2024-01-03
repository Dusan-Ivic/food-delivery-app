import { Header } from "@/components";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { generateToken } from "@/features/auth/slices";
import { useEffect } from "react";
import { CreateTokenRequestDto } from "@/features/auth/types/request";
import { GrantType } from "@/features/auth/types/enums";
import { DeliveryLocationProvider } from "@/features/delivery/context";
import { AuthUserProvider } from "@/features/auth/context";

function App() {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Mechanism for refreshing access token before it expires
    let expirationTimer: number | undefined;

    if (refreshToken && accessToken) {
      const expirationTimestamp = accessToken.issuedAt + accessToken.expiresIn;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const remainingTime = expirationTimestamp - currentTimestamp;

      const refreshThreshold = import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD;
      const setThreshold = remainingTime < refreshThreshold ? 0 : refreshThreshold;

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
  }, [refreshToken, accessToken, dispatch]);

  return (
    <AuthUserProvider>
      <DeliveryLocationProvider>
        <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
          <Header />
          <ToastContainer style={{ width: "40%" }} position="top-left" />
          <Container>
            <Outlet />
          </Container>
        </div>
      </DeliveryLocationProvider>
    </AuthUserProvider>
  );
}

export default App;
