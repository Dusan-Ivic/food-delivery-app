import { BasicInfo } from "@/features/stores/types/request";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function BasicInfoForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<BasicInfo>();

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              isValid={!errors.name && !!getValues("name")}
              placeholder="example name"
            />
            <div className="text-danger">{errors.name?.message}</div>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              {...register("category")}
              isValid={!errors.category && !!getValues("category")}
              placeholder="category"
            />
            <div className="text-danger">{errors.category?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              {...register("description")}
              isValid={!errors.description && !!getValues("description")}
              placeholder="description"
            />
            <div className="text-danger">{errors.description?.message}</div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
