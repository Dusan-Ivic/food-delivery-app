import axios from "axios";
import apiClient from "@/config/apiClient";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { PartnerRequestDto, VerifyPartnerRequestDto } from "@/features/partners/types/request";

const getPartners = async (token: string | null): Promise<PartnerResponseDto[]> => {
  try {
    const response = await apiClient.get<PartnerResponseDto[]>("/api/partners", {
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

const registerPartner = async (requestDto: PartnerRequestDto): Promise<PartnerResponseDto> => {
  try {
    const response = await apiClient.post<PartnerResponseDto>("/api/partners", requestDto);
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
    const response = await apiClient.put<PartnerResponseDto>(
      `/api/partners/${partnerId}/status`,
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
  registerPartner,
  verifyPartner,
};

export default partnersService;
