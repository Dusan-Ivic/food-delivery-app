import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { User, UserRequestDto } from "../interfaces/user";

interface UserDetailsProps {
  onSubmit: (data: UserRequestDto) => void;
  user: User;
}

export function UserDetails({ user, onSubmit }: UserDetailsProps) {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequestDto>({
    mode: "all",
    defaultValues: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    resolver: yupResolver(validationSchema),
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
              isValid={!errors.username}
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
              isValid={!errors.email}
              placeholder="example@example.com"
            />
            <div className="text-danger">{errors.email?.message}</div>
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
              isValid={!errors.firstName}
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
              isValid={!errors.lastName}
              placeholder="Doe"
            />
            <div className="text-danger">{errors.lastName?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="w-100">
        Save Changes
      </Button>
    </Form>
  );
}
