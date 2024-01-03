import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LoginForm } from "@/features/auth/components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthUser } from "@/features/auth/hooks";

export function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuthUser();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Login</h1>
        <p className="text-center mt-4">Sign in with data you entered during registration</p>
        <LoginForm onSubmit={login} />
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
