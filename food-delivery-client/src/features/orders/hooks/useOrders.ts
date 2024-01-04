import { useAuthUser } from "@/features/auth/hooks";
import ordersService from "@/features/orders/api";
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

  const cancelOrder = async (orderId: number) => {
    if (accessToken) {
      await ordersService.cancelOrder(orderId, accessToken.payload);
      setOrders(await ordersService.getOrders(accessToken.payload));
    }
  };

  return { orders, cancelOrder };
}
