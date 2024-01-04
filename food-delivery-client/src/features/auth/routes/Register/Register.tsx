import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { AllowedUserType } from "@/features/auth/types/enums";
import { RegisterRequestDto } from "@/features/auth/types/request";
import { RegisterForm } from "@/features/auth/components";
import { usePartners } from "@/features/partners/hooks";
import { useCustomers } from "@/features/customers/hooks";

export function Register() {
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState<AllowedUserType | null>(null);
  const { registerPartner } = usePartners();
  const { registerCustomer } = useCustomers();

  const handleRegister = (data: RegisterRequestDto) => {
    switch (registerType) {
      case AllowedUserType.Customer:
        registerCustomer(data).then(() => navigate("/login"));
        break;
      case AllowedUserType.Partner:
        registerPartner(data).then(() => navigate("/login"));
        break;
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        {registerType != null ? (
          <>
            <Link to="/register" onClick={() => setRegisterType(null)} className="text-reset">
              <IoArrowBack className="fs-3" />
            </Link>
            <h1 className="text-center mt-3 mb-4">Sign up as a {AllowedUserType[registerType]}</h1>
            <p className="text-center mt-4">
              Fill in your details and register as a {AllowedUserType[registerType]}
            </p>
            <RegisterForm onSubmit={handleRegister} />
          </>
        ) : (
          <>
            <h1 className="text-center mt-3 mb-4">Sign up</h1>
            <p className="text-center mt-4">Create new customer or partner account</p>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <Button onClick={() => setRegisterType(AllowedUserType.Customer)} className="w-50">
                <AiOutlineUser /> Customer
              </Button>
              <Button onClick={() => setRegisterType(AllowedUserType.Partner)} className="w-50">
                <FaRegHandshake /> Partner
              </Button>
            </div>
          </>
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
