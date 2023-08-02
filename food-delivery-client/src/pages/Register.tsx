import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { CustomerRequestDto } from "../interfaces/customer";
import { PartnerRequestDto } from "../interfaces/partner";
import { Link } from "react-router-dom";
import { AllowedUserType, StateStatus } from "../interfaces/enums";
import {
  registerCustomer,
  registerPartner,
  reset,
} from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterCustomer } from "../components/forms/RegisterCustomer";
import { RegisterPartner } from "../components/forms/RegisterPartner";
import { IoArrowBack } from "react-icons/io5";

interface FormComponentProps {
  onSubmit: (data: CustomerRequestDto | PartnerRequestDto) => void;
}

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.auth);
  const [registerType, setRegisterType] = useState<AllowedUserType | null>(
    null
  );

  useEffect(() => {
    if (status == StateStatus.Error) {
      toast.error(message);
    }

    if (status == StateStatus.Success) {
      toast.success(message);
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

  const onRegister = (data: CustomerRequestDto | PartnerRequestDto) => {
    switch (registerType) {
      case AllowedUserType.Customer:
        dispatch(registerCustomer(data as CustomerRequestDto));
        break;
      case AllowedUserType.Partner:
        dispatch(registerPartner(data as PartnerRequestDto));
        break;
    }
  };

  const FormComponent = ({ onSubmit }: FormComponentProps) => {
    switch (registerType) {
      case AllowedUserType.Customer:
        return <RegisterCustomer onSubmit={onSubmit} />;
      case AllowedUserType.Partner:
        return <RegisterPartner onSubmit={onSubmit} />;
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        {registerType != null ? (
          <>
            <Link
              to="/register"
              onClick={() => setRegisterType(null)}
              className="text-reset"
            >
              <IoArrowBack className="fs-3" />
            </Link>
            <h1 className="text-center mt-3 mb-4">
              Sign up as a {AllowedUserType[registerType]}
            </h1>
            <p className="text-center mt-4">
              Fill in your details and register as a{" "}
              {AllowedUserType[registerType]}
            </p>
            <FormComponent onSubmit={onRegister} />
          </>
        ) : (
          <>
            <h1 className="text-center mt-3 mb-4">Sign up</h1>
            <p className="text-center mt-4">
              Create new customer or partner account
            </p>
            <div className="d-flex flex-column justify-content-center align-items-center row-gap-1">
              <Button
                onClick={() => setRegisterType(AllowedUserType.Customer)}
                className="w-75"
              >
                Customer
              </Button>
              <Button
                onClick={() => setRegisterType(AllowedUserType.Partner)}
                className="w-75"
              >
                Partner
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
