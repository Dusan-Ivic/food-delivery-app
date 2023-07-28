import { Col, Row } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import { LoginFormData } from "../interfaces/login";

export function Login() {
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

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
