import axios from "axios";
import { LoginRequestDto, LoginResponseDto } from "../../interfaces/login";
import {
  RegisterCustomerRequestDto,
  RegisterCustomerResponseDto,
} from "../../interfaces/customer";
import {
  RegisterPartnerRequestDto,
  RegisterPartnerResponseDto,
} from "../../interfaces/partner";

const loginUser = async (
  requestDto: LoginRequestDto
): Promise<LoginResponseDto> => {
  try {
    const response = await axios.post<LoginResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth`,
      requestDto
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const registerCustomer = async (
  requestDto: RegisterCustomerRequestDto
): Promise<RegisterCustomerResponseDto> => {
  try {
    const response = await axios.post<RegisterCustomerResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/customers`,
      requestDto
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const registerPartner = async (
  requestDto: RegisterPartnerRequestDto
): Promise<RegisterPartnerResponseDto> => {
  try {
    const response = await axios.post<RegisterPartnerResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/partners`,
      requestDto
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const authService = {
  loginUser,
  registerCustomer,
  registerPartner,
};

export default authService;
