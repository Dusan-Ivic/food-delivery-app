import { UpdateCustomerRequestDto } from "./customer";
import { UpdatePartnerRequestDto } from "./partner";

export enum UserType {
  Customer = 0,
  Partner = 1,
  Admin = 2,
}

export enum AllowedUserType {
  Customer = 0,
  Partner = 1,
}

interface UserBase {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
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

export enum PartnerStatus {
  Pending = 0,
  Rejected = 1,
  Accepted = 2,
  Suspended = 3,
}

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