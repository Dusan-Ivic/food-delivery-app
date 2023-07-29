import { PartnerStatus } from "./user";

interface PartnerBase {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterPartnerRequestDto extends PartnerBase {
  password: string;
  confirmPassword: string;
}

export interface RegisterPartnerResponseDto extends PartnerBase {
  id: number;
  status: PartnerStatus;
}
