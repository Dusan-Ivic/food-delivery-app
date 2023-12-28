import axios from "axios";
import { ImageResponseDto } from "@/interfaces/image";
import apiClient from "@/config/apiClient";
import { Coordinate } from "@/interfaces/geolocation";
import { StoreRequestDto } from "@/features/stores/types/request";
import { StoreResponseDto } from "@/features/stores/types/response";

const getStores = async (): Promise<StoreResponseDto[]> => {
  try {
    const response = await apiClient.get<StoreResponseDto[]>("/api/stores");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const getStoresByPartner = async (partnerId: number): Promise<StoreResponseDto[]> => {
  try {
    const response = await apiClient.get<StoreResponseDto[]>(`/api/stores?partnerId=${partnerId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const getStoresInArea = async (coordinate: Coordinate): Promise<StoreResponseDto[]> => {
  try {
    const response = await apiClient.get<StoreResponseDto[]>(
      `/api/stores?latitude=${coordinate.y}&longitude=${coordinate.x}`
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
  getStores,
  getStoresByPartner,
  getStoresInArea,
  createStore,
  uploadImage,
  updateStore,
};

export default storesService;
