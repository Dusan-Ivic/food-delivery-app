import { UpdateCustomerRequestDto } from "./customer";
import { UpdatePartnerRequestDto } from "./partner";
import { PartnerStatus, UserType } from "./enums";

interface UserBase {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  image: string | null;
}

export interface Partner extends UserBase {
  partnerStatus: PartnerStatus;
}

export interface Customer extends UserBase {
  address: string;
  city: string;
  postalCode: string;
}

export interface Admin extends UserBase {}

export type User = Customer | Partner | Admin;

export interface UserRequestDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserData {
  data: UpdateCustomerRequestDto | UpdatePartnerRequestDto;
  userId: number;
  userType: UserType;
}
