import { createContext, useContext } from "react";
import { DeliveryLocation } from "./DeliveryLocationContext";

interface DeliveryLocationContextType {
  deliveryLocation: DeliveryLocation | null;
  openLocationModal: () => void;
}

export const DeliveryLocationContext =
  createContext<DeliveryLocationContextType>({} as DeliveryLocationContextType);

export function useDeliveryLocation() {
  return useContext(DeliveryLocationContext);
}
