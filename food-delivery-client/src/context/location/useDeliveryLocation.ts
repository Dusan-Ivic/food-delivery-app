import { createContext, useContext } from "react";
import { DeliveryLocation } from "./DeliveryLocationContext";

interface DeliveryLocationContextType {
  deliveryLocation: DeliveryLocation | null;
  changeLocation: (newLocation: DeliveryLocation) => void;
  openLocationModal: () => void;
}

export const DeliveryLocationContext =
  createContext<DeliveryLocationContextType>({} as DeliveryLocationContextType);

export function useDeliveryLocation() {
  return useContext(DeliveryLocationContext);
}
