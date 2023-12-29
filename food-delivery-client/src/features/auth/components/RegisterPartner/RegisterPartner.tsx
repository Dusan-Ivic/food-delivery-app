import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PartnerRequestDto } from "@/features/partners/types/request";
import { registerPartnerSchema } from "@/features/auth/types/schemas";

interface RegisterPartnerProps {
  onSubmit: (data: PartnerRequestDto) => void;
}

export function RegisterPartner({ onSubmit }: RegisterPartnerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<PartnerRequestDto>({
    mode: "all",
    resolver: yupResolver(registerPartnerSchema),
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

      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>
    </Form>
  );
}
