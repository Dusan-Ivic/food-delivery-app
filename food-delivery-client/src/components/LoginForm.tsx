import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoginFormData } from "../interfaces/login";
import { UserType } from "../interfaces/user";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    userType: Yup.number()
      .required("User type is required")
      .oneOf(Object.values(UserType) as number[], "User type is not valid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          {...register("username")}
          placeholder="example"
        />
        <div className="text-danger">{errors.username?.message}</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...register("password")}
          placeholder="min. 8 characters"
        />
        <div className="text-danger">{errors.password?.message}</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="userType">
        <Form.Label>Login as</Form.Label>
        <Form.Select {...register("userType", { valueAsNumber: true })}>
          <option value="0">Customer</option>
          <option value="1">Partner</option>
          <option value="2">Admin</option>
        </Form.Select>
        <div className="text-danger">{errors.userType?.message}</div>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
}
