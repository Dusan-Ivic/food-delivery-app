import { UserType } from "./user";

export interface LoginFormData {
  username: string;
  password: string;
  userType: UserType;
}
