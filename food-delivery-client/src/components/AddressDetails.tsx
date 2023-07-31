import { Row, Col, Form, Button } from "react-bootstrap";
import { Customer } from "../interfaces/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AddressInfo } from "../interfaces/customer";

interface AddressDetailsProps {
  user: Customer;
  onSubmit: (data: AddressInfo) => void;
}

export function AddressDetails({ user, onSubmit }: AddressDetailsProps) {
  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long"),
    city: Yup.string()
      .required("City is required")
      .max(50, "City name is too long"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .max(10, "Postal code is too long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInfo>({
    mode: "all",
    defaultValues: {
      address: user.address,
      city: user.city,
      postalCode: user.postalCode
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("address")}
              isValid={!errors.address}
              placeholder="Example Address 100"
            />
            <div className="text-danger">{errors.address?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              {...register("city")}
              isValid={!errors.city}
              placeholder="Example City"
            />
            <div className="text-danger">{errors.city?.message}</div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              {...register("postalCode")}
              isValid={!errors.postalCode}
              placeholder="12345"
            />
            <div className="text-danger">{errors.postalCode?.message}</div>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="w-100">
        Save Changes
      </Button>
    </Form>
  );
}
