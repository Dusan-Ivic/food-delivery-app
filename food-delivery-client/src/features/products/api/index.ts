import axios from "axios";
import { ImageResponseDto } from "@/types/image";
import apiClient from "@/config/apiClient";
import { ProductResponseDto } from "@/features/products/types/response";
import { ProductRequestDto } from "@/features/products/types/request";

const getProducts = async (storeId: string): Promise<ProductResponseDto[]> => {
  try {
    const response = await apiClient.get<ProductResponseDto[]>(`/api/products?storeId=${storeId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const createProduct = async (
  requestDto: ProductRequestDto,
  token: string | null
): Promise<ProductResponseDto> => {
  try {
    const response = await apiClient.post<ProductResponseDto>("/api/products", requestDto, {
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

const updateProduct = async (
  productId: number,
  requestDto: ProductRequestDto,
  token: string | null
): Promise<ProductResponseDto> => {
  try {
    const response = await apiClient.put<ProductResponseDto>(
      `/api/products/${productId}`,
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

const deleteProduct = async (productId: number, token: string | null): Promise<{ id: number }> => {
  try {
    const response = await apiClient.delete<{ id: number }>(`/api/products/${productId}`, {
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
  productId: number,
  formData: FormData,
  token: string | null
): Promise<ImageResponseDto> => {
  try {
    const response = await apiClient.put<ImageResponseDto>(
      `/api/products/${productId}/image`,
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

const productsService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};

export default productsService;
