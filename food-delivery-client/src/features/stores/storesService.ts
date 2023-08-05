import axios from "axios";
import { StoreRequestDto, StoreResponseDto } from "../../interfaces/store";
import { ImageResponseDto } from "../../interfaces/image";
import apiClient from "../../config/apiClient";

const getStores = async (
  partnerId: number | null
): Promise<StoreResponseDto[]> => {
  try {
    const query = partnerId ? `?partnerId=${partnerId}` : "";
    const response = await apiClient.get<StoreResponseDto[]>(
      `/api/stores${query}`
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
): Promise<StoreResponseDto[]> => {
  try {
    const response = await apiClient.get<StoreResponseDto[]>(
      `/api/stores?partnerId=${partnerId}`
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
  requestDto: StoreRequestDto,
  token: string | null
): Promise<StoreResponseDto> => {
  try {
    const response = await apiClient.post<StoreResponseDto>(
      "/api/stores",
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
    const response = await apiClient.put<ImageResponseDto>(
      `/api/stores/${storeId}/image`,
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

const updateStore = async (
  storeId: number,
  requestDto: StoreRequestDto,
  token: string | null
): Promise<StoreResponseDto> => {
  try {
    const response = await apiClient.put<StoreResponseDto>(
      `/api/stores/${storeId}`,
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

const storesService = {
  getStores,
  getStoresByPartner,
  createStore,
  uploadImage,
  updateStore,
};

export default storesService;
