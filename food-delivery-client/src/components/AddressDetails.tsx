import { Row, Col, Form } from "react-bootstrap";
import { Customer } from "../interfaces/user";

interface AddressDetailsProps {
  user: Customer;
}

export function AddressDetails({ user }: AddressDetailsProps) {
  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example Address 100"
              value={user.address}
              readOnly
            />
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example City"
              value={user.city}
              readOnly
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              placeholder="12345"
              value={user.postalCode}
              readOnly
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
