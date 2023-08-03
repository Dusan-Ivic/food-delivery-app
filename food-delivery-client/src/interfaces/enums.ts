export enum StateStatus {
  None,
  Loading,
  Error,
  Success,
}

export enum UserType {
  Customer = 0,
  Partner = 1,
  Admin = 2,
}

export enum AllowedUserType {
  Customer = 0,
  Partner = 1,
}

export enum PartnerStatus {
  Pending = 0,
  Rejected = 1,
  Accepted = 2,
  Suspended = 3,
}

export enum OrderStatus {
  Pending = 0,
  Canceled = 1,
  Completed = 2,
}

export enum GrantType {
  UsernamePassword = 0,
  RefreshToken = 1,
}
