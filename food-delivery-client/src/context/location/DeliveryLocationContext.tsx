import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { DeliveryLocationContext } from "./useDeliveryLocation";
import { FormModal, FormProps } from "../../components/FormModal";
import { DeliveryAddressForm } from "../../components/forms/DeliveryAddressForm";
import { useAppSelector } from "../../app/hooks";

export function DeliveryLocationProvider({
  children,
}: DeliveryLocationProviderProps) {
  const { user } = useAppSelector((state) => state.auth);
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
  }: FormProps<DeliveryLocation>) => {
    return <DeliveryAddressForm user={user} data={data} onSubmit={onSubmit} />;
  };

  return (
    <DeliveryLocationContext.Provider
      value={{ deliveryLocation, changeLocation, openLocationModal }}
    >
      {children}
      <FormModal
        isVisible={isModalVisible}
        title="Set delivery address"
        FormComponent={DeliveryAddressFormComponent}
        data={deliveryLocation}
        onSubmit={(data) => setDeliveryLocation(data)}
        onClose={() => setModalVisible(false)}
      />
    </DeliveryLocationContext.Provider>
  );
}
