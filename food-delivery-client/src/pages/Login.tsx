import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import { LoginFormData } from "../interfaces/login";
import { loginUser, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { StateStatus } from "../interfaces/state";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status, message } = useAppSelector((state) => state.auth);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status == StateStatus.Error) {
      console.error(message);
    }

    if (user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, status, message]);

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Login</h1>
        <LoginForm onSubmit={onSubmit} />
        <p className="text-center mt-4">Don't have an account? Sign up</p>
      </Col>
    </Row>
  );
}
