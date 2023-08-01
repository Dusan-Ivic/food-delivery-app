import { Link } from "react-router-dom";
import { AllowedUserType } from "../../interfaces/enums";
import { CustomerRequestDto } from "../../interfaces/customer";
import { PartnerRequestDto } from "../../interfaces/partner";
import {
  RegisterCustomerForm,
  RegisterPartnerForm,
} from "../../components/forms";

interface RegisterFormScreenProps {
  onSubmit: (data: CustomerRequestDto | PartnerRequestDto) => void;
  onSetType: (type: AllowedUserType | null) => void;
  userType: AllowedUserType;
}

interface FormComponentProps {
  onSubmit: (data: CustomerRequestDto | PartnerRequestDto) => void;
}

export function RegisterFormScreen({
  onSubmit,
  onSetType,
  userType,
}: RegisterFormScreenProps) {
  const FormComponent = ({ onSubmit }: FormComponentProps) => {
    switch (userType) {
      case AllowedUserType.Customer:
        return <RegisterCustomerForm onSubmit={onSubmit} />;
      case AllowedUserType.Partner:
        return <RegisterPartnerForm onSubmit={onSubmit} />;
    }
  };

  return (
    <>
      <h1 className="text-center mt-3 mb-4">
        Sign up as a {AllowedUserType[userType]}
      </h1>
      <p className="text-center mt-4">
        <Link
          to="/register"
          onClick={() => onSetType(null)}
          className="text-decoration-none"
        >
          Go back
        </Link>
      </p>
      <FormComponent onSubmit={onSubmit} />
    </>
  );
}
