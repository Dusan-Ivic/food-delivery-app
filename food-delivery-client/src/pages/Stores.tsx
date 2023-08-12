import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getStores, reset } from "../features/stores/storesSlice";
import { StateStatus, UserType } from "../interfaces/enums";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { StoreList } from "../components/StoreList";
import { FaLocationDot } from "react-icons/fa6";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDeliveryLocation } from "../context/location/useDeliveryLocation";

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { deliveryLocation, openLocationModal } = useDeliveryLocation();

  useEffect(() => {
    if (deliveryLocation) {
      dispatch(getStores({ city: deliveryLocation.city }));
    } else if (!user || user?.userType === UserType.Customer) {
      dispatch(getStores());
    } else {
      dispatch(getStores());
    }
  }, [deliveryLocation]);

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
        {(!user || user?.userType === UserType.Customer) && (
          <div className="d-flex justify-content-center">
            <div
              className="d-flex gap-1 align-items-center px-2 py-2 rounded"
              style={{ cursor: "pointer" }}
              onClick={() => openLocationModal()}
            >
              <FaLocationDot style={{ fontSize: "24px" }} />
              {deliveryLocation ? (
                <div className="lead">{`${deliveryLocation.address}, ${deliveryLocation.city}`}</div>
              ) : (
                <div className="lead">Set location</div>
              )}
            </div>
          </div>
        )}

        {selectedCity || selectedCategory ? (
          <Col>
            <h1 className="text-center mt-3 mb-4 display-4">Filtered Stores</h1>
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
            <h1 className="text-center mt-3 mb-4 display-4">
              {deliveryLocation
                ? `Stores delivering to ${deliveryLocation?.city}`
                : "All available Stores"}
            </h1>
            {status === StateStatus.Loading ? (
              <Spinner />
            ) : (
              <>
                {stores.length > 0 ? (
                  <StoreList stores={stores} />
                ) : (
                  <p className="text-center mt-4">
                    {deliveryLocation
                      ? `There are currently no stores delivering to ${deliveryLocation?.city}`
                      : "There are currently no registered stores"}
                  </p>
                )}
              </>
            )}
          </Col>
        )}
      </Col>
    </Row>
  );
}
