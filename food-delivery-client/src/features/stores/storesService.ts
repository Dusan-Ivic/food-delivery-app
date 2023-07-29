import axios from "axios";
import { GetStoreResponseDto } from "../../interfaces/store";

const getStores = async (): Promise<GetStoreResponseDto[]> => {
  try {
    const response = await axios.get<GetStoreResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/stores`
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
};

export default storesService;
