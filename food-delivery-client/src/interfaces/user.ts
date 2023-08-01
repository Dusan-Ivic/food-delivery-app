import { CustomerRequestDto, CustomerState } from "./customer";
import { PartnerRequestDto, PartnerState } from "./partner";
import { AdminRequestDto, AdminState } from "./admin";

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
export type UserRequestDto =
  | CustomerRequestDto
  | PartnerRequestDto
  | AdminRequestDto;
