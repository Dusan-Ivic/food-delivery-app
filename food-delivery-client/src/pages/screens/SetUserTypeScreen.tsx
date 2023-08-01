import { Button } from "react-bootstrap";
import { AllowedUserType } from "../../interfaces/enums";

interface SetUserTypeProps {
  onSetType: (type: AllowedUserType) => void;
}

export function SetUserTypeScreen({ onSetType }: SetUserTypeProps) {
  return (
    <>
      <h1 className="text-center mt-3 mb-4">Sign up</h1>
      <p className="text-center mt-4">Create new customer or partner account</p>
      <div className="d-flex flex-column justify-content-center align-items-center row-gap-1">
        <Button
          onClick={() => onSetType(AllowedUserType.Customer)}
          className="w-75"
        >
          Customer
        </Button>
        <Button
          onClick={() => onSetType(AllowedUserType.Partner)}
          className="w-75"
        >
          Partner
        </Button>
      </div>
    </>
  );
}
