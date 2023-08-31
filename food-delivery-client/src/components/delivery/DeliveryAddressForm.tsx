import { Button, Form } from "react-bootstrap";
import { AddressInfo, UserState } from "../../interfaces/user";
import { useState } from "react";
import { CustomerState } from "../../interfaces/customer";
import { AddressDetails } from "../shared/AddressDetails";
import { UserType } from "../../interfaces/enums";

interface DeliveryAddressFormProps {
  data: AddressInfo | null;
  user: UserState | null;
  onSubmit: (data: AddressInfo) => void;
}

export function DeliveryAddressForm({
  data,
  user,
  onSubmit,
}: DeliveryAddressFormProps) {
  const [option, setOption] = useState<string>("current");

  return (
    <div>
      <div className="mb-3">
        <Form.Check
          type="radio"
          name="option"
          value="new"
          label="Choose new address"
          onChange={(e) => setOption(e.target.value)}
        />

        {user && user.userType === UserType.Customer && (
          <Form.Check
            type="radio"
            name="option"
            value="current"
            label="Use address from your profile"
            onChange={(e) => setOption(e.target.value)}
          />
        )}
      </div>

      {option === "current" && (
        <Button
          variant="primary"
          className="w-100"
          onClick={() =>
            onSubmit({
              address: (user as CustomerState).address,
              city: (user as CustomerState).city,
              postalCode: (user as CustomerState).postalCode,
            })
          }
        >
          Set Address
        </Button>
      )}

      {option === "new" && <AddressDetails data={data} onSubmit={onSubmit} />}
    </div>
  );
}
