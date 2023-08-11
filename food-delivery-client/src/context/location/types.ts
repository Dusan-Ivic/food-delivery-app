interface DeliveryLocation {
  address: string;
  city: string;
  postalCode: string;
}

interface DeliveryLocationContextType {
  deliveryLocation: DeliveryLocation | null;
  changeLocation: (newLocation: DeliveryLocation) => void;
  openLocationModal: () => void;
}

interface DeliveryLocationProviderProps {
  children: React.ReactNode;
}
