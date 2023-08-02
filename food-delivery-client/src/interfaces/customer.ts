import { UserType } from "./enums";
import { AddressInfo, UserBase } from "./user";

export interface CustomerBase extends UserBase, AddressInfo {}

export interface RegisterCustomerRequestDto extends CustomerBase {
  password: string;
  confirmPassword: string;
}

export interface CustomerRequestDto extends CustomerBase {}

export interface CustomerResponseDto extends CustomerBase {
  id: number;
  userType: UserType;
  imageData: Uint8Array;
}

export interface CustomerState extends CustomerBase {
  id: number;
  userType: UserType;
  imageData: string | null;
}
