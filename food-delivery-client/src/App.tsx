import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Register,
  Store,
  Orders,
  Dashboard,
} from "./pages";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getProfile, generateToken, reset } from "./features/auth/authSlice";
import { useEffect } from "react";
import { CreateTokenRequestDto } from "./interfaces/token";
import { GrantType } from "./interfaces/enums";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, accessToken, refreshToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!refreshToken) {
      navigate("/login");
    } else if (!accessToken) {
      const requestDto: CreateTokenRequestDto = {
        grantType: GrantType.RefreshToken,
        refreshToken: refreshToken,
      };
      dispatch(generateToken(requestDto));
    } else if (!user) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [accessToken, refreshToken]);

  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      <Header />
      <ToastContainer style={{ width: "40%" }} position="top-left" />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stores/:id" element={<Store />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute sourcePage="/orders">
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute sourcePage="/profile">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute sourcePage="/dashboard">
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
