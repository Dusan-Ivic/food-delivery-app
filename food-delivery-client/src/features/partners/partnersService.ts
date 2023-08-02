import axios from "axios";
import { PartnerResponseDto } from "../../interfaces/partner";

const getPartners = async (
  token: string | null
): Promise<PartnerResponseDto[]> => {
  try {
    const response = await axios.get<PartnerResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/partners`,
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

const partnersService = {
  getPartners,
};

export default partnersService;
