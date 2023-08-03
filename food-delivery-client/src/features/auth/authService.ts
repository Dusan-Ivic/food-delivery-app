import axios from "axios";
import {
  CustomerRequestDto,
  CustomerResponseDto,
} from "../../interfaces/customer";
import {
  PartnerRequestDto,
  PartnerResponseDto,
} from "../../interfaces/partner";
import { ImageResponseDto } from "../../interfaces/image";
import {
  ChangePasswordRequestDto,
  UserResponseDto,
} from "../../interfaces/user";
import {
  CreateTokenRequestDto,
  DeleteTokenRequestDto,
  TokenResponseDto,
} from "../../interfaces/token";

const generateToken = async (
  requestDto: CreateTokenRequestDto
): Promise<TokenResponseDto> => {
  try {
    const response = await axios.post<TokenResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth/token`,
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

const getProfile = async (token: string | null): Promise<UserResponseDto> => {
  try {
    const response = await axios.get<UserResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth/profile`,
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

const deleteRefreshToken = async (
  requestDto: DeleteTokenRequestDto,
  token: string | null
): Promise<void> => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/auth/token`,
      {
        data: requestDto,
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

const registerCustomer = async (
  requestDto: CustomerRequestDto
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
  requestDto: PartnerRequestDto
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
  requestDto: CustomerRequestDto,
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
  requestDto: PartnerRequestDto,
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

const uploadImage = async (
  formData: FormData,
  token: string | null
): Promise<ImageResponseDto> => {
  try {
    const response = await axios.put<ImageResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

const removeImage = async (token: string | null): Promise<void> => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/auth/image`,
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

const changePassword = async (
  requestDto: ChangePasswordRequestDto,
  token: string | null
): Promise<string> => {
  try {
    const response = await axios.put<string>(
      `${import.meta.env.VITE_API_URL}/api/auth/password`,
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
  generateToken,
  getProfile,
  deleteRefreshToken,
  registerCustomer,
  registerPartner,
  updateCustomer,
  updatePartner,
  uploadImage,
  removeImage,
  changePassword,
};

export default authService;
