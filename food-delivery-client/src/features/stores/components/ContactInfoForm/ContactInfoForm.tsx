import { ContactInfo } from "@/features/stores/types/request";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function ContactInfoForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<ContactInfo>();

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("address")}
              isValid={!errors.address && !!getValues("address")}
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
              isValid={!errors.city && !!getValues("city")}
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
              isValid={!errors.postalCode && !!getValues("postalCode")}
              placeholder="12345"
            />
            <div className="text-danger">{errors.postalCode?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              {...register("phone")}
              isValid={!errors.phone && !!getValues("phone")}
              placeholder="1234567"
            />
            <div className="text-danger">{errors.phone?.message}</div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
