import { PartnerStatus } from "./user";

interface PartnerBase {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PartnerResponseDto extends PartnerBase {
  id: number;
  status: PartnerStatus;
}

export interface RegisterPartnerRequestDto extends PartnerBase {
  password: string;
  confirmPassword: string;
}

export interface UpdatePartnerRequestDto extends PartnerBase {}