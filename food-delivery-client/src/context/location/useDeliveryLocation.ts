import { createContext, useContext } from "react";

export const DeliveryLocationContext =
  createContext<DeliveryLocationContextType>({} as DeliveryLocationContextType);

export function useDeliveryLocation() {
  return useContext(DeliveryLocationContext);
}
