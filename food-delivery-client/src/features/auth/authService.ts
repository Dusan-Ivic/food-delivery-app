import axios from "axios";
import { LoginFormData, LoginResponseDto } from "../../interfaces/login";
import {
  RegisterCustomerFormData,
  RegisterCustomerResponseDto,
  RegisterPartnerFormData,
  RegisterPartnerResponseDto,
} from "../../interfaces/register";

const loginUser = async (
  requestDto: LoginFormData
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
  requestDto: RegisterCustomerFormData
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
  requestDto: RegisterPartnerFormData
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
