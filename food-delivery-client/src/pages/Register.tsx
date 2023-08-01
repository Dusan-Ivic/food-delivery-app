import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { CustomerRequestDto } from "../interfaces/customer";
import { PartnerRequestDto } from "../interfaces/partner";
import { Link } from "react-router-dom";
import { AllowedUserType, StateStatus } from "../interfaces/enums";
import { SetUserTypeScreen, RegisterFormScreen } from "./screens";
import {
  registerCustomer,
  registerPartner,
  reset,
} from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Register() {
  const [userType, setUserType] = useState<AllowedUserType | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.auth);

  const onSubmit = (data: CustomerRequestDto | PartnerRequestDto) => {
    switch (userType) {
      case AllowedUserType.Customer:
        dispatch(registerCustomer(data as CustomerRequestDto));
        break;
      case AllowedUserType.Partner:
        dispatch(registerPartner(data as PartnerRequestDto));
        break;
    }
  };

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
