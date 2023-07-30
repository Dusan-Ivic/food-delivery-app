import axios from "axios";
import { GetProductResponseDto } from "../../interfaces/product";

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

const productsService = {
  getProductsByStore,
};

export default productsService;
