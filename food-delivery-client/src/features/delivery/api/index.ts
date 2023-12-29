import geoClient from "@/config/geoClient";
import { ReverseGeocodingRequestParams } from "@/features/delivery/types/request";
import { ReverseGeocodingResponseDto } from "@/features/delivery/types/response";
import axios from "axios";

export const getReverseGeocoding = async (
  params: ReverseGeocodingRequestParams
): Promise<ReverseGeocodingResponseDto> => {
  try {
    const { lat, lon, type, format, apiKey } = params;
    const response = await geoClient.get<ReverseGeocodingResponseDto>(
      `/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=${type}&format=${format}&apiKey=${apiKey}`
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
