export enum UserType {
  Customer = 0,
  Partner = 1,
  Admin = 2,
}

export enum AllowedUserType {
  Customer = 0,
  Partner = 1,
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}
