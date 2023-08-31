import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StoreRequestDto } from "../../interfaces/store";

interface StoreFormProps {
  onSubmit: (data: StoreRequestDto) => void;
  store: StoreRequestDto | null;
}

export function StoreForm({ onSubmit, store }: StoreFormProps) {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name is too long"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description is too long"),
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long"),
    city: Yup.string()
      .required("City is required")
      .max(50, "City name is too long"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .max(10, "Postal code is too long"),
    phone: Yup.string()
      .required("Phone number is required")
      .max(20, "Phone number is too long"),
    category: Yup.string()
      .required("Category is required")
      .max(20, "Category is too long"),
    deliveryTimeInMinutes: Yup.number()
      .typeError("Delivery time must be a number")
      .required("Delivery time is required")
      .moreThan(0, "Delivery time must be greater than 0"),
    deliveryFee: Yup.number()
      .typeError("Delivery fee must be a number")
      .required("Delivery fee is required")
      .min(0, "Delivery fee can't be a negative number")
      .max(10, "Delivery fee can't be greater than $10"),
  });

  const initialValues: StoreRequestDto = {
    name: store?.name || "",
    description: store?.description || "",
    address: store?.address || "",
    city: store?.city || "",
    postalCode: store?.postalCode || "",
    phone: store?.phone || "",
    category: store?.category || "",
    deliveryTimeInMinutes: store?.deliveryTimeInMinutes || 0,
    deliveryFee: store?.deliveryFee || 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<StoreRequestDto>({
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

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("address")}
              isValid={touchedFields.address && !errors.address}
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
              isValid={touchedFields.city && !errors.city}
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
              isValid={touchedFields.postalCode && !errors.postalCode}
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
              isValid={touchedFields.phone && !errors.phone}
              placeholder="1234567"
            />
            <div className="text-danger">{errors.phone?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              {...register("category")}
              isValid={touchedFields.category && !errors.category}
              placeholder="Pizza"
            />
            <div className="text-danger">{errors.category?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="deliveryTimeInMinutes">
            <Form.Label>Estimated delivery time</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
              min={0}
              step={0.1}
              {...register("deliveryTimeInMinutes")}
              isValid={
                touchedFields.deliveryTimeInMinutes &&
                !errors.deliveryTimeInMinutes
              }
              placeholder="in minutes"
            />
            <div className="text-danger">
              {errors.deliveryTimeInMinutes?.message}
            </div>
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
              isValid={touchedFields.deliveryFee && !errors.deliveryFee}
              placeholder="$0"
            />
            <div className="text-danger">{errors.deliveryFee?.message}</div>
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
