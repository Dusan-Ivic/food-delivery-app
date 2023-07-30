import axios from "axios";
import {
  GetOrderResponseDto,
  OrderRequestDto,
  OrderResponseDto,
} from "../../interfaces/order";

const getOrders = async (
  token: string | null
): Promise<GetOrderResponseDto[]> => {
  try {
    const response = await axios.get<GetOrderResponseDto[]>(
      `${import.meta.env.VITE_API_URL}/api/orders`,
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

const createOrder = async (
  requestDto: OrderRequestDto,
  token: string | null
): Promise<OrderResponseDto> => {
  try {
    const response = await axios.post<OrderResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/orders`,
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

const ordersService = {
  getOrders,
  createOrder,
};

export default ordersService;
