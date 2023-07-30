import axios from "axios";
import { OrderRequestDto, OrderResponseDto } from "../../interfaces/order";

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
  createOrder,
};

export default ordersService;
