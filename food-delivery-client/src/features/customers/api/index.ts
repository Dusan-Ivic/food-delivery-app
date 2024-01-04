import apiClient from "@/config/apiClient";
import { CustomerRequestDto } from "@/features/customers/types/request";
import { CustomerResponseDto } from "@/features/customers/types/response";
import axios from "axios";

const registerCustomer = async (requestDto: CustomerRequestDto): Promise<CustomerResponseDto> => {
  try {
    const response = await apiClient.post<CustomerResponseDto>("/api/customers", requestDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Unknown error occurred.");
    }
  }
};

const customersService = {
  registerCustomer,
};

export default customersService;
