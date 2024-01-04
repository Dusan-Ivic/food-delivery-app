import axios from "axios";
import { ImageResponseDto } from "@/types/image";
import apiClient from "@/config/apiClient";
import { StoreRequestDto } from "@/features/stores/types/request";
import { StoreResponseDto } from "@/features/stores/types/response";
import { StoreFilters } from "@/features/stores/types/search";

const getStore = async (storeId: string): Promise<StoreResponseDto> => {
  try {
    const response = await apiClient.get<StoreResponseDto>(`/api/stores/${storeId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const getStores = async (filters: StoreFilters): Promise<StoreResponseDto[]> => {
  try {
    const response = await apiClient.get<StoreResponseDto[]>(
      `/api/stores?partnerId=${filters.partnerId || ""}&latitude=${
        filters.coordinate?.y || ""
      }&longitude=${filters.coordinate?.x || ""}`
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
    const response = await apiClient.post<StoreResponseDto>("/api/stores", requestDto, {
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
    const response = await apiClient.put<StoreResponseDto>(`/api/stores/${storeId}`, requestDto, {
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

const storesService = {
  getStore,
  getStores,
  createStore,
  uploadImage,
  updateStore,
};

export default storesService;
