import { PartnerStatus } from "./user";

export interface RegisterPartnerFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface RegisterCustomerFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface RegisterCustomerResponseDto {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface RegisterPartnerResponseDto {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  partnerStatus: PartnerStatus;
}
