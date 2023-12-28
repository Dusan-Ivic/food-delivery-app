import { UserRequestDto } from "@/features/auth/types/request";
import { UserResponseDto } from "@/features/auth/types/response";
import { AddressInfo } from "@/interfaces/address";

export type CustomerRequestDto = UserRequestDto &
  AddressInfo & {
    password: string;
    confirmPassword: string;
  };

export type CustomerResponseDto = UserResponseDto & AddressInfo;
