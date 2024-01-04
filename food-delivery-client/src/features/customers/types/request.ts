import { UserRequestDto } from "@/features/auth/types/request";

export type CustomerRequestDto = UserRequestDto & {
  password: string;
  confirmPassword: string;
};
