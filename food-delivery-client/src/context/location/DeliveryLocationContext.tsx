import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { DeliveryLocationContext } from "./useDeliveryLocation";
import { FormModal, FormProps } from "../../components/shared/FormModal";
import { DeliveryLocationMap } from "../../components/delivery/DeliveryLocationMap";
import { Coordinate } from "../../interfaces/geolocation";

export interface DeliveryLocation {
  coordinate: Coordinate | undefined;
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

  const DeliveryAddressFormComponent = ({
    data,
    onSubmit,
  }: FormProps<Coordinate>) => {
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
        FormComponent={DeliveryAddressFormComponent}
        data={deliveryLocation?.coordinate}
        onSubmit={(newLocation) =>
          setDeliveryLocation({
            coordinate: newLocation,
          })
        }
        onClose={() => setModalVisible(false)}
      />
    </DeliveryLocationContext.Provider>
  );
}
