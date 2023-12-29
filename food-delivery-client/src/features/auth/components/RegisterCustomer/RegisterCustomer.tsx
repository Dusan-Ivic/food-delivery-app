import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerCustomerSchema } from "@/features/auth/types/schemas";
import { CustomerRequestDto } from "@/features/auth/types/request";

interface RegisterCustomerProps {
  onSubmit: (data: CustomerRequestDto) => void;
}

export function RegisterCustomer({ onSubmit }: RegisterCustomerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CustomerRequestDto>({
    mode: "all",
    resolver: yupResolver(registerCustomerSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              {...register("username")}
              isValid={touchedFields.username && !errors.username}
              placeholder="example"
            />
            <div className="text-danger">{errors.username?.message}</div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              isValid={touchedFields.email && !errors.email}
              placeholder="example@example.com"
            />
            <div className="text-danger">{errors.email?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              isValid={touchedFields.password && !errors.password}
              placeholder="min. 8 characters"
            />
            <div className="text-danger">{errors.password?.message}</div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              {...register("confirmPassword")}
              isValid={touchedFields.confirmPassword && !errors.confirmPassword}
              placeholder="repeat your password"
            />
            <div className="text-danger">{errors.confirmPassword?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2}>
        <Col>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              {...register("firstName")}
              isValid={touchedFields.firstName && !errors.firstName}
              placeholder="John"
            />
            <div className="text-danger">{errors.firstName?.message}</div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              {...register("lastName")}
              isValid={touchedFields.lastName && !errors.lastName}
              placeholder="Doe"
            />
            <div className="text-danger">{errors.lastName?.message}</div>
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

      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>
    </Form>
  );
}
