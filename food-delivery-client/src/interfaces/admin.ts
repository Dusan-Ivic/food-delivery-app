import { UserType } from "./enums";
import { UserBase } from "./user";

export interface AdminBase extends UserBase {}

export interface RegisterAdminRequestDto extends AdminBase {
  password: string;
  confirmPassword: string;
}

export interface AdminRequestDto extends AdminBase {}

export interface AdminResponseDto extends AdminBase {
  id: number;
  userType: UserType;
  image: string | null;
}

export interface AdminState extends AdminBase {
  id: number;
  userType: UserType;
  image: string | null;
}
