import axios from "axios";
import { GetStoreResponseDto } from "../../interfaces/store";

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

const storesService = {
  getStores,
  getStoresByPartner,
};

export default storesService;
