import { Col, Row } from "react-bootstrap";
import { RegisterForm } from "../components/RegisterForm";
import { RegisterFormData } from "../interfaces/register";
import { Link } from "react-router-dom";

export function Register() {
  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Sign up</h1>
        <p className="text-center mt-4">
          Create personal account or register as a partner
        </p>
        <RegisterForm onSubmit={onSubmit} />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Sign in
          </Link>
        </p>
      </Col>
    </Row>
  );
}
