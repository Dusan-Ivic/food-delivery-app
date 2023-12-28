import { DeliveryInfo } from "@/features/stores/types/request";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function DeliveryInfoForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<DeliveryInfo>();

  return (
    <>
      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="deliveryTimeInMinutes">
            <Form.Label>Delivery time</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              min={0}
              step={0.1}
              {...register("deliveryTimeInMinutes")}
              isValid={!errors.deliveryTimeInMinutes && !!getValues("deliveryTimeInMinutes")}
              placeholder="in minutes"
            />
            <div className="text-danger">{errors.deliveryTimeInMinutes?.message}</div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="deliveryFee">
            <Form.Label>Delivery fee</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              min={0}
              step="any"
              {...register("deliveryFee")}
              isValid={!errors.deliveryFee && !!getValues("deliveryFee")}
              placeholder="$0"
            />
            <div className="text-danger">{errors.deliveryFee?.message}</div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
