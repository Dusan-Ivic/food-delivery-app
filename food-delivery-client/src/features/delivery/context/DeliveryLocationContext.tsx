import { createContext, useState } from "react";
import { useLocalStorage } from "@/hooks";
import { FormModal, FormProps } from "@/components";
import { DeliveryLocation } from "@/features/delivery/types/location";
import { DeliveryLocationMap } from "@/features/delivery/components";

interface DeliveryLocationContextType {
  deliveryLocation: DeliveryLocation | null;
  openLocationModal: () => void;
}

export const DeliveryLocationContext = createContext<DeliveryLocationContextType>(
  {} as DeliveryLocationContextType
);

interface DeliveryLocationProviderProps {
  children: React.ReactNode;
}

export function DeliveryLocationProvider({ children }: DeliveryLocationProviderProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [deliveryLocation, setDeliveryLocation] = useLocalStorage<DeliveryLocation | null>(
    "deliveryLocation",
    null
  );

  const openLocationModal = () => {
    setModalVisible(true);
  };

  const DeliveryLocationMapComponent = ({ data, onSubmit }: FormProps<DeliveryLocation>) => {
    return <DeliveryLocationMap location={data} onSetLocation={onSubmit} />;
  };

  return (
    <DeliveryLocationContext.Provider value={{ deliveryLocation, openLocationModal }}>
      {children}
      <FormModal
        isVisible={isModalVisible}
        title="Set delivery location"
        FormComponent={DeliveryLocationMapComponent}
        data={deliveryLocation}
        onSubmit={(data) => {
          setDeliveryLocation({
            coordinate: data.coordinate,
            address: data.address,
          });
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    </DeliveryLocationContext.Provider>
  );
}
