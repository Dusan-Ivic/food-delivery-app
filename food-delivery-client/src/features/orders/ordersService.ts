import axios from "axios";
import {
  CheckoutResponseDto,
  OrderRequestDto,
  OrderResponseDto,
} from "../../interfaces/order";
import apiClient from "../../config/apiClient";

const getOrders = async (token: string | null): Promise<OrderResponseDto[]> => {
  try {
    const response = await apiClient.get<OrderResponseDto[]>("/api/orders", {
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

const createCheckout = async (
  requestDto: OrderRequestDto,
  token: string | null
): Promise<CheckoutResponseDto> => {
  try {
    const response = await apiClient.post<CheckoutResponseDto>(
      "/api/orders/checkout",
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

const createOrder = async (
  requestDto: OrderRequestDto,
  token: string | null
): Promise<OrderResponseDto> => {
  try {
    const response = await apiClient.post<OrderResponseDto>(
      "/api/orders",
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
    const response = await apiClient.delete<{ id: number }>(
      `/api/orders/${orderId}/refund`,
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
  createCheckout,
  createOrder,
  cancelOrder,
};

export default ordersService;
