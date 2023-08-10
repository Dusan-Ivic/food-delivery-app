import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getStores, reset } from "../features/stores/storesSlice";
import { StateStatus, UserType } from "../interfaces/enums";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { StoreList } from "../components/StoreList";
import { FaLocationDot } from "react-icons/fa6";
import { CustomerState } from "../interfaces/customer";
import { FormModal, FormProps } from "../components/FormModal";
import { AddressInfo } from "../interfaces/user";
import { DeliveryAddressForm } from "../components/forms/DeliveryAddressForm";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [isAddressModalVisible, setAddressModalVisible] =
    useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] =
    useLocalStorage<AddressInfo | null>("deliveryAddress", null);

  useEffect(() => {
    if (deliveryAddress) {
      dispatch(getStores({ city: deliveryAddress.city }));
    } else if (user && user.userType === UserType.Customer) {
      setDeliveryAddress({
        address: (user as CustomerState).address,
        city: (user as CustomerState).city,
        postalCode: (user as CustomerState).postalCode,
      });
    } else {
      dispatch(getStores());
    }
  }, [deliveryAddress]);

  useEffect(() => {
    if (status == StateStatus.Error && message) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

  const DeliveryAddressFormComponent = ({
    data,
    onSubmit,
  }: FormProps<AddressInfo>) => {
    return <DeliveryAddressForm user={user} data={data} onSubmit={onSubmit} />;
  };

  return (
    <>
      {user && user.userType === UserType.Customer && (
        <div className="d-flex justify-content-center">
          <div
            className="d-flex gap-1 align-items-center px-2 py-2 rounded"
            style={{ cursor: "pointer", backgroundColor: "#ccc" }}
            onClick={() => setAddressModalVisible(true)}
          >
            <FaLocationDot style={{ fontSize: "24px" }} />
            <div>{`${deliveryAddress?.address}, ${deliveryAddress?.city}`}</div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-center mt-3 mb-4 display-4">
          {user && user.userType === UserType.Customer
            ? `Stores delivering to ${deliveryAddress?.city}`
            : "Available Stores"}
        </h1>

        {status === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {stores.length > 0 ? (
              <StoreList stores={stores} />
            ) : (
              <p className="text-center mt-4">
                {user && user.userType === UserType.Customer
                  ? `There are currently no stores delivering to ${deliveryAddress?.city}`
                  : "There are currently no registered stores"}
              </p>
            )}
          </>
        )}
      </div>

      <FormModal
        isVisible={isAddressModalVisible}
        title="Set delivery address"
        FormComponent={DeliveryAddressFormComponent}
        data={deliveryAddress}
        onSubmit={(data) => setDeliveryAddress(data)}
        onClose={() => setAddressModalVisible(false)}
      />
    </>
  );
}
