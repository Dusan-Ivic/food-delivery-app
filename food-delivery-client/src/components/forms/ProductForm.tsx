import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ProductFormData } from "../../interfaces/product";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  product: ProductFormData | null;
}

export function ProductForm({ onSubmit, product }: ProductFormProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name is too long"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description is too long"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .moreThan(0, "Price must be greater than 0"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .moreThan(0, "Quantity must be greater than 0"),
  });

  const initialValues: ProductFormData = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ProductFormData>({
    mode: "all",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name")}
              isValid={touchedFields.name && !errors.name}
              placeholder="example name"
            />
            <div className="text-danger">{errors.name?.message}</div>
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
              isValid={touchedFields.description && !errors.description}
              placeholder="description"
            />
            <div className="text-danger">{errors.description?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              min={0}
              step="any"
              {...register("price")}
              isValid={
                touchedFields.price &&
                !errors.price
              }
              placeholder="$10"
            />
            <div className="text-danger">
              {errors.price?.message}
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              min={0}
              step={1}
              {...register("quantity")}
              isValid={
                touchedFields.quantity &&
                !errors.quantity
              }
              placeholder="50"
            />
            <div className="text-danger">
              {errors.quantity?.message}
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
