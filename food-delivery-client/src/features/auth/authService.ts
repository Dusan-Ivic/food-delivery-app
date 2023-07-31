import axios from "axios";
import { LoginRequestDto, LoginResponseDto } from "../../interfaces/login";
import {
  RegisterCustomerRequestDto,
  CustomerResponseDto,
  UpdateCustomerRequestDto,
} from "../../interfaces/customer";
import {
  RegisterPartnerRequestDto,
  PartnerResponseDto,
  UpdatePartnerRequestDto,
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
): Promise<CustomerResponseDto> => {
  try {
    const response = await axios.post<CustomerResponseDto>(
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
): Promise<PartnerResponseDto> => {
  try {
    const response = await axios.post<PartnerResponseDto>(
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

const updateCustomer = async (
  customerId: number,
  requestDto: UpdateCustomerRequestDto,
  token: string | null
): Promise<CustomerResponseDto> => {
  try {
    const response = await axios.put<CustomerResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/customers/${customerId}`,
      requestDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

const updatePartner = async (
  partnerId: number,
  requestDto: UpdatePartnerRequestDto,
  token: string | null
): Promise<PartnerResponseDto> => {
  try {
    const response = await axios.put<PartnerResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/partners/${partnerId}`,
      requestDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  updateCustomer,
  updatePartner,
};

export default authService;
