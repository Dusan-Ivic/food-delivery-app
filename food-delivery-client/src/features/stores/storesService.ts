import axios from "axios";
import {
  CreateStoreRequestDto,
  CreateStoreResponseDto,
  GetStoreResponseDto,
} from "../../interfaces/store";
import { ImageResponseDto } from "../../interfaces/image";

const getStores = async (
  partnerId: number | null
): Promise<GetStoreResponseDto[]> => {
  try {
    const query = partnerId ? `?partnerId=${partnerId}` : "";
    const response = await axios.get<GetStoreResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/stores${query}`
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

const getStoresByPartner = async (
  partnerId: number
): Promise<GetStoreResponseDto[]> => {
  try {
    const response = await axios.get<GetStoreResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/stores?partnerId=${partnerId}`
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

const createStore = async (
  requestDto: CreateStoreRequestDto,
  token: string | null
): Promise<CreateStoreResponseDto> => {
  try {
    const response = await axios.post<CreateStoreResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/stores`,
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
  storeId: number,
  formData: FormData,
  token: string | null
): Promise<ImageResponseDto> => {
  try {
    const response = await axios.put<ImageResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/stores/${storeId}/image`,
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

const storesService = {
  getStores,
  getStoresByPartner,
  createStore,
  uploadImage,
};

export default storesService;
