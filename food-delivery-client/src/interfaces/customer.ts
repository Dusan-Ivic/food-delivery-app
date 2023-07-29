export interface CustomerBase {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface RegisterCustomerRequestDto extends CustomerBase {
  password: string;
  confirmPassword: string;
}

export interface RegisterCustomerResponseDto extends CustomerBase {
  id: number;
}
