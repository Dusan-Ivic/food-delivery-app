import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ChangePasswordRequestDto } from "@/features/auth/types/request";
import { changePasswordSchema } from "@/features/auth/types/schemas";

interface ChangePasswordProps {
  onSubmit: (data: ChangePasswordRequestDto) => void;
}

export function ChangePassword({ onSubmit }: ChangePasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordRequestDto>({
    mode: "all",
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="oldPassword">
            <div className="d-flex justify-content-between">
              <Form.Label>Old password</Form.Label>
              <div
                className="me-1 fs-5 d-flex align-items-center"
                style={{ cursor: "pointer", color: "darkslategray" }}
              >
                {showPassword ? (
                  <AiFillEyeInvisible onClick={() => setShowPassword(false)} />
                ) : (
                  <AiFillEye onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("oldPassword")}
              isValid={!errors.oldPassword}
              placeholder="********"
            />
            <div className="text-danger">{errors.oldPassword?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              isValid={!errors.confirmPassword}
              placeholder="********"
            />
            <div className="text-danger">{errors.confirmPassword?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              isValid={!errors.newPassword}
              placeholder="********"
            />
            <div className="text-danger">{errors.newPassword?.message}</div>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="w-100">
        Change Password
      </Button>
    </Form>
  );
}
