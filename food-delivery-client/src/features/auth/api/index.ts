import axios from "axios";
import { ImageResponseDto } from "@/types/image";
import apiClient from "@/config/apiClient";
import {
  CreateTokenRequestDto,
  DeleteTokenRequestDto,
  ChangePasswordRequestDto,
  RegisterRequestDto,
  UserRequestDto,
} from "@/features/auth/types/request";
import { TokenResponseDto, UserResponseDto } from "@/features/auth/types/response";
import { PartnerResponseDto } from "@/features/partners/types/response";

const generateToken = async (requestDto: CreateTokenRequestDto): Promise<TokenResponseDto> => {
  try {
    const response = await apiClient.post<TokenResponseDto>("/api/auth/token", requestDto);
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
    const response = await apiClient.get<UserResponseDto>("/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await apiClient.delete("/api/auth/token", {
      data: requestDto,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const registerCustomer = async (requestDto: RegisterRequestDto): Promise<UserResponseDto> => {
  try {
    const response = await apiClient.post<UserResponseDto>("/api/customers", requestDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const registerPartner = async (requestDto: RegisterRequestDto): Promise<PartnerResponseDto> => {
  try {
    const response = await apiClient.post<PartnerResponseDto>("/api/partners", requestDto);
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
  requestDto: UserRequestDto,
  token: string | null
): Promise<UserResponseDto> => {
  try {
    const response = await apiClient.put<UserResponseDto>(
      `/api/customers/${customerId}`,
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
  requestDto: UserRequestDto,
  token: string | null
): Promise<PartnerResponseDto> => {
  try {
    const response = await apiClient.put<PartnerResponseDto>(
      `/api/partners/${partnerId}`,
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

const uploadImage = async (formData: FormData, token: string | null): Promise<ImageResponseDto> => {
  try {
    const response = await apiClient.put<ImageResponseDto>("/api/auth/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
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
    const response = await apiClient.delete("/api/auth/image", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await apiClient.put<string>("/api/auth/password", requestDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
