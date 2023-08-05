import { PartnerStatus, UserType } from "./enums";
import { UserBase } from "./user";

export interface PartnerBase extends UserBase {}

export interface RegisterPartnerRequestDto extends PartnerBase {
  password: string;
  confirmPassword: string;
}

export interface PartnerRequestDto extends PartnerBase {}

export interface PartnerResponseDto extends PartnerBase {
  id: number;
  status: PartnerStatus;
  userType: UserType;
  image: string | null;
}

export interface PartnerState extends PartnerBase {
  id: number;
  status: PartnerStatus;
  userType: UserType;
  image: string | null;
}

export interface VerifyPartnerRequestDto {
  status: PartnerStatus;
}
