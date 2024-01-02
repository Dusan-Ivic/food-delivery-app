import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LoginForm } from "@/features/auth/components";
import { generateToken, reset } from "@/features/auth/slices";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { StateStatus } from "@/types/state";
import { Link } from "react-router-dom";
import { Spinner } from "@/components";
import { CreateTokenRequestDto, LoginRequestDto } from "@/features/auth/types/request";
import { GrantType, UserType } from "@/features/auth/types/enums";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status, message } = useAppSelector((state) => state.auth);

  const onSubmit = (data: LoginRequestDto) => {
    const requestDto: CreateTokenRequestDto = {
      grantType: GrantType.UsernamePassword,
      username: data.username,
      password: data.password,
      userType: data.userType,
    };
    dispatch(generateToken(requestDto));
  };

  useEffect(() => {
    if (user) {
      if (user.userType == UserType.Customer) {
        navigate("/stores");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, status, message, navigate]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (status === StateStatus.Loading) {
    return <Spinner />;
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Login</h1>
        <p className="text-center mt-4">Sign in with data you entered during registration</p>
        <LoginForm onSubmit={onSubmit} />
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Sign up
          </Link>
        </p>
      </Col>
    </Row>
  );
}
