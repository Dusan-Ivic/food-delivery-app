export interface CustomerBase {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CustomerResponseDto extends CustomerBase {
  id: number;
}

export interface RegisterCustomerRequestDto extends CustomerBase {
  password: string;
  confirmPassword: string;
}

export interface UpdateCustomerRequestDto extends CustomerBase {}

export interface AddressInfo {
  address: string;
  city: string;
  postalCode: string;
}