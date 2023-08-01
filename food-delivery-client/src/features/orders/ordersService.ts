import axios from "axios";
import { OrderRequestDto, OrderResponseDto } from "../../interfaces/order";

const getOrders = async (token: string | null): Promise<OrderResponseDto[]> => {
  try {
    const response = await axios.get<OrderResponseDto[]>(
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

const cancelOrder = async (
  orderId: number,
  token: string | null
): Promise<{ id: number }> => {
  try {
    const response = await axios.delete<{ id: number }>(
      `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
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
  cancelOrder,
};

export default ordersService;
