import { UserType } from "./user";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  userType: UserType;
}
