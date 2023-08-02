import {
  CustomerRequestDto,
  CustomerResponseDto,
  CustomerState,
} from "./customer";
import { PartnerRequestDto, PartnerResponseDto, PartnerState } from "./partner";
import { AdminRequestDto, AdminResponseDto, AdminState } from "./admin";

export interface AddressInfo {
  address: string;
  city: string;
  postalCode: string;
}

export interface UserBase {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type UserState = CustomerState | PartnerState | AdminState;
export type UserResponseDto =
  | CustomerResponseDto
  | PartnerResponseDto
  | AdminResponseDto;
export type UserRequestDto =
  | CustomerRequestDto
  | PartnerRequestDto
  | AdminRequestDto;

export interface ChangePasswordRequestDto {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
}
