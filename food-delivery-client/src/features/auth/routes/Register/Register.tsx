import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StateStatus } from "@/types/state";
import { registerCustomer, registerPartner, reset } from "@/features/auth/slices";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { Spinner } from "@/components";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { AllowedUserType } from "@/features/auth/types/enums";
import { RegisterRequestDto } from "@/features/auth/types/request";
import { RegisterForm } from "@/features/auth/components";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.auth);
  const [registerType, setRegisterType] = useState<AllowedUserType | null>(null);

  useEffect(() => {
    if (status == StateStatus.Success) {
      toast.success(message);
      navigate("/login");
    }
  }, [status, message, navigate]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const onRegister = (data: RegisterRequestDto) => {
    switch (registerType) {
      case AllowedUserType.Customer:
        dispatch(registerCustomer(data));
        break;
      case AllowedUserType.Partner:
        dispatch(registerPartner(data));
        break;
    }
  };

  if (status === StateStatus.Loading) {
    return <Spinner />;
  }

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
            <RegisterForm onSubmit={onRegister} />
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
