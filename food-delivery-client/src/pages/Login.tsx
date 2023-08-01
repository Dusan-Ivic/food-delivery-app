import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LoginForm } from "../components/forms/LoginForm";
import { LoginRequestDto as LoginFormData } from "../interfaces/login";
import { loginUser, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { StateStatus, UserType } from "../interfaces/enums";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status, message } = useAppSelector((state) => state.auth);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (status == StateStatus.Error) {
      toast.error(message);
    }

    if (user) {
      if (user.userType == UserType.Customer) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, status, message]);

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Login</h1>
        <p className="text-center mt-4">
          Sign in with data you entered during registration
        </p>
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
