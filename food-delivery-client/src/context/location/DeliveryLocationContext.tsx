import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { DeliveryLocationContext } from "./useDeliveryLocation";
import { FormModal, FormProps } from "../../components/shared/FormModal";
import { DeliveryLocationMap } from "../../components/delivery/DeliveryLocationMap";
import { Coordinate } from "../../interfaces/geolocation";

export interface DeliveryLocation {
  coordinate: Coordinate | undefined;
  address: string | undefined;
}

interface DeliveryLocationProviderProps {
  children: React.ReactNode;
}

export function DeliveryLocationProvider({
  children,
}: DeliveryLocationProviderProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [deliveryLocation, setDeliveryLocation] =
    useLocalStorage<DeliveryLocation | null>("deliveryLocation", null);

  const changeLocation = (newLocation: DeliveryLocation) => {
    setDeliveryLocation(newLocation);
  };

  const openLocationModal = () => {
    setModalVisible(true);
  };

  const DeliveryLocationMapComponent = ({
    data,
    onSubmit,
  }: FormProps<DeliveryLocation>) => {
    return <DeliveryLocationMap location={data} onSetLocation={onSubmit} />;
  };

  return (
    <DeliveryLocationContext.Provider
      value={{ deliveryLocation, changeLocation, openLocationModal }}
    >
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
