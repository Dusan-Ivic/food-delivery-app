import { useAuthUser } from "@/features/auth/hooks";
import ordersService from "@/features/orders/api";
import { OrderRequestDto } from "@/features/orders/types/request";
import { OrderResponseDto } from "@/features/orders/types/response";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const { accessToken } = useAuthUser();

  useEffect(() => {
    const getOrders = async (accessToken: string) => {
      setOrders(await ordersService.getOrders(accessToken));
    };

    if (accessToken) {
      getOrders(accessToken.payload);
    }
  }, [accessToken]);

  const createCheckout = async (data: OrderRequestDto) => {
    if (accessToken) {
      const response = await ordersService.createCheckout(data, accessToken.payload);
      window.location.href = response.sessionUrl;
    }
  };

  const cancelOrder = async (orderId: number) => {
    if (accessToken) {
      await ordersService.cancelOrder(orderId, accessToken.payload);
      setOrders(await ordersService.getOrders(accessToken.payload));
    }
  };

  return { orders, createCheckout, cancelOrder };
}
