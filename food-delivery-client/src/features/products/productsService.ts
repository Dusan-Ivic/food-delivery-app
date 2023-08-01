import axios from "axios";
import {
  ProductRequestDto,
  ProductResponseDto,
  GetProductResponseDto,
} from "../../interfaces/product";

const getProductsByStore = async (
  storeId: number
): Promise<GetProductResponseDto[]> => {
  try {
    const response = await axios.get<GetProductResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/products?storeId=${storeId}`
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

const createProduct = async (
  requestDto: ProductRequestDto,
  token: string | null
): Promise<ProductResponseDto> => {
  try {
    const response = await axios.post<ProductResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/products`,
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

const updateProduct = async (
  productId: number,
  requestDto: ProductRequestDto,
  token: string | null
): Promise<ProductResponseDto> => {
  try {
    const response = await axios.put<ProductResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
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

const deleteProduct = async (
  productId: number,
  token: string | null
): Promise<{ id: number }> => {
  try {
    const response = await axios.delete<{ id: number }>(
      `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
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

const productsService = {
  getProductsByStore,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productsService;
