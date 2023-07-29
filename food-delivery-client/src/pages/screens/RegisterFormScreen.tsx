import { Link } from "react-router-dom";
import { AllowedUserType } from "../../interfaces/user";
import {
  RegisterPartnerFormData,
  RegisterCustomerFormData,
} from "../../interfaces/register";
import {
  RegisterCustomerForm,
  RegisterPartnerForm,
} from "../../components/forms";

interface RegisterFormScreenProps {
  onSubmit: (data: RegisterCustomerFormData | RegisterPartnerFormData) => void;
  onSetType: (type: AllowedUserType | null) => void;
  userType: AllowedUserType;
}

interface FormComponentProps {
  onSubmit: (data: RegisterCustomerFormData | RegisterPartnerFormData) => void;
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
