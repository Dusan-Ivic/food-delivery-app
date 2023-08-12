import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getStores, reset } from "../features/stores/storesSlice";
import { StateStatus, UserType } from "../interfaces/enums";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { StoreList } from "../components/StoreList";
import { FaBurger, FaLocationDot, FaPizzaSlice } from "react-icons/fa6";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDeliveryLocation } from "../context/location/useDeliveryLocation";
import { BiSolidSushi } from "react-icons/bi";
import { GiTacos, GiFishEggs } from "react-icons/gi";

interface CategoryItem {
  name: string;
  count: number;
}

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status, message } = useAppSelector((state) => state.stores);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    if (selectedCategory) {
      return stores.filter((store) => store.category === selectedCategory);
    }

    return [];
  }, [stores, selectedCategory]);

  const allCategories = useMemo<CategoryItem[]>(() => {
    const categoryMap = new Map<string, number>();
    stores.forEach((store) => {
      const count = categoryMap.get(store.category) ?? 0;
      categoryMap.set(store.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [stores]);

  const popularCategories = useMemo(() => {
    const sortedCategories = allCategories.sort((a, b) => b.count - a.count);
    return sortedCategories.slice(0, 3);
  }, [allCategories]);

  const categoryIconMapper = (category: string) => {
    switch (category.toLowerCase()) {
      case "pizza":
        return <FaPizzaSlice />;
      case "burgers":
        return <FaBurger />;
      case "sushi":
        return <BiSolidSushi />;
      case "mexican":
        return <GiTacos />;
      case "groceries":
        return <GiFishEggs />;
      default:
        return null;
    }
  };

  return (
    <Row>
      <Col md={2}>
        <div className="text-center">
          <div className="mb-1 lead">Filter By</div>
          <hr style={{ borderTop: "2px solid black" }} />

          <div className="mb-3">
            <div className="mb-1 lead">Popular Categories</div>
            <ListGroup>
              {popularCategories.map((category) => (
                <ListGroupItem
                  key={category.name}
                  action={true}
                  active={category.name === selectedCategory}
                  onClick={() => {
                    if (selectedCategory === category.name) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(category.name);
                    }
                  }}
                >
                  <div>
                    <div>{categoryIconMapper(category.name)}</div>
                    <div>{category.name}</div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <hr style={{ borderTop: "2px solid black" }} />

          <div className="mb-3">
            <div className="mb-1 lead">All Categories</div>
            <ListGroup>
              {allCategories.map((category) => (
                <ListGroupItem
                  key={category.name}
                  action={true}
                  active={category.name === selectedCategory}
                  onClick={() => {
                    if (selectedCategory === category.name) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(category.name);
                    }
                  }}
                >
                  <div>
                    <div>{categoryIconMapper(category.name)}</div>
                    <div>{category.name}</div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <hr style={{ borderTop: "2px solid black" }} />
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

        {selectedCategory ? (
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