import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/features/auth/types/schemas";
import { LoginRequestDto } from "@/features/auth/types/request";

interface LoginFormProps {
  onSubmit: (data: LoginRequestDto) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginRequestDto>({
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
