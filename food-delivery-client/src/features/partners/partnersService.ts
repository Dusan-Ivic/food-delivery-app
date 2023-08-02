import axios from "axios";
import {
  PartnerResponseDto,
  VerifyPartnerRequestDto,
} from "../../interfaces/partner";

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

const verifyPartner = async (
  partnerId: number,
  requestDto: VerifyPartnerRequestDto,
  token: string | null
): Promise<PartnerResponseDto> => {
  try {
    const response = await axios.put<PartnerResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/partners/${partnerId}/status`,
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

const partnersService = {
  getPartners,
  verifyPartner,
};

export default partnersService;
