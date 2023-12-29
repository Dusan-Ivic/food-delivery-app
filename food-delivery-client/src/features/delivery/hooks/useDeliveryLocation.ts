import { DeliveryLocationContext } from "@/features/delivery/context";
import { useContext } from "react";

export function useDeliveryLocation() {
  return useContext(DeliveryLocationContext);
}
