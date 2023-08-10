import { useEffect, useMemo, useState } from "react";
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
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [isAddressModalVisible, setAddressModalVisible] =
    useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] =
    useLocalStorage<AddressInfo | null>("deliveryAddress", null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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

  const filteredStores = useMemo(() => {
    if (selectedCity && selectedCategory) {
      return stores.filter(
        (store) =>
          store.category === selectedCategory && store.city === selectedCity
      );
    } else if (selectedCity) {
      return stores.filter((store) => store.city === selectedCity);
    } else if (selectedCategory) {
      return stores.filter((store) => store.category === selectedCategory);
    } else {
      return [];
    }
  }, [stores, selectedCity, selectedCategory]);

  const availableCities = useMemo(() => {
    const citiesSet = new Set<string>();
    stores.forEach((store) => citiesSet.add(store.city));
    return Array.from(citiesSet);
  }, [stores]);

  const DeliveryAddressFormComponent = ({
    data,
    onSubmit,
  }: FormProps<AddressInfo>) => {
    return <DeliveryAddressForm user={user} data={data} onSubmit={onSubmit} />;
  };

  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    stores.forEach((store) => categoriesSet.add(store.category));
    return Array.from(categoriesSet);
  }, [stores]);

  return (
    <Row>
      <Col md={2}>
        <div>
          <div className="text-center mb-1 lead">Filter By</div>
          <hr style={{ borderTop: "2px solid black" }} />

          <div className="mb-3">
            <div className="text-center mb-1">Categories</div>
            <ListGroup>
              {availableCategories.map((category) => (
                <ListGroupItem
                  key={category}
                  action={true}
                  active={category === selectedCategory}
                  onClick={() => {
                    if (selectedCategory === category) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(category);
                    }
                  }}
                >
                  {category}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <div className="text-center mb-1">Cities</div>
          <ListGroup>
            {availableCities.map((city) => (
              <ListGroupItem
                key={city}
                action={true}
                active={city === selectedCity}
                onClick={() => {
                  if (selectedCity === city) {
                    setSelectedCity(null);
                  } else {
                    setSelectedCity(city);
                  }
                }}
              >
                {city}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Col>

      <Col>
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

        {selectedCity || selectedCategory ? (
          <Col>
            <h1 className="text-center mt-3 mb-4">Filtered Stores</h1>
            {status === StateStatus.Loading ? (
              <Spinner />
            ) : (
              <>
                {filteredStores.length > 0 ? (
                  <StoreList stores={filteredStores} />
                ) : (
                  <p className="text-center mt-4">
                    There are no stores found for this criteria
                  </p>
                )}
              </>
            )}
          </Col>
        ) : (
          <Col>
            <h1 className="text-center mt-3 mb-4">All Stores</h1>
            {status === StateStatus.Loading ? (
              <Spinner />
            ) : (
              <>
                {stores.length > 0 ? (
                  <StoreList stores={stores} />
                ) : (
                  <p className="text-center mt-4">
                    There are currently no registered stores
                  </p>
                )}
              </>
            )}
          </Col>
        )}
      </Col>

      <FormModal
        isVisible={isAddressModalVisible}
        title="Set delivery address"
        FormComponent={DeliveryAddressFormComponent}
        data={deliveryAddress}
        onSubmit={(data) => setDeliveryAddress(data)}
        onClose={() => setAddressModalVisible(false)}
      />
    </Row>
  );
}
