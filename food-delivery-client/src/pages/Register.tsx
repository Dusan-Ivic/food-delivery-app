import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  RegisterCustomerFormData,
  RegisterPartnerFormData,
} from "../interfaces/register";
import { Link } from "react-router-dom";
import { AllowedUserType } from "../interfaces/user";
import { SetUserTypeScreen, RegisterFormScreen } from "./screens";

export function Register() {
  const [userType, setUserType] = useState<AllowedUserType | null>(null);

  const onSubmit = (
    data: RegisterCustomerFormData | RegisterPartnerFormData
  ) => {
    console.log(data);
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        {userType != null ? (
          <RegisterFormScreen
            onSubmit={onSubmit}
            userType={userType}
            onSetType={setUserType}
          />
        ) : (
          <SetUserTypeScreen onSetType={setUserType} />
        )}
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
