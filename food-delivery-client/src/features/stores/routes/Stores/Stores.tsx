import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getStores, reset } from "@/features/stores/slices";
import { StateStatus } from "@/types/state";
import { Spinner } from "@/components";
import { StoreList } from "@/features/stores/components";
import { FaLocationDot } from "react-icons/fa6";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDeliveryLocation } from "@/features/delivery/hooks";
import categoryIcons from "@/features/stores/data/categoryIcons";
import { UserType } from "@/features/auth/types/enums";
import { StoreCategory } from "@/features/stores/types/category";

export function Stores() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores, status } = useAppSelector((state) => state.stores);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { deliveryLocation, openLocationModal } = useDeliveryLocation();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deliveryLocation) {
      dispatch(getStores({ coordinate: deliveryLocation.coordinate }));
    } else if (!user || user?.userType === UserType.Customer) {
      dispatch(getStores());
    } else {
      dispatch(getStores());
    }
  }, [deliveryLocation, dispatch, user]);

  const filteredStores = useMemo(() => {
    if (selectedCategory) {
      return stores.filter((store) => store.category === selectedCategory);
    }

    return [];
  }, [stores, selectedCategory]);

  const allCategories = useMemo<StoreCategory[]>(() => {
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
    return sortedCategories.slice(0, 4);
  }, [allCategories]);

  const IconComponent = ({ categoryName }: { categoryName: string }) => {
    const selectedIcon = categoryIcons.find((x) => x.name === categoryName);

    if (!selectedIcon) {
      return null;
    }

    const SelectedIconComponent = selectedIcon.icon;

    return <SelectedIconComponent />;
  };

  return (
    <Row>
      <Col md={2}>
        <div className="text-center">
          <div className="mb-1 lead">Categories</div>
          <hr style={{ borderTop: "2px solid black" }} />

          <div className="mb-3">
            <div className="mb-1 lead">Popular</div>
            <ListGroup className="flex-row flex-md-column rounded-0">
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
                    <IconComponent categoryName={category.name} />
                    <div>{category.name}</div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>

            <hr style={{ borderTop: "2px solid black" }} />
          </div>

          <div className="mb-3 d-none d-md-block">
            <div className="mb-1 lead">All</div>
            <ListGroup className="flex-row flex-md-column rounded-0">
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
                    <IconComponent categoryName={category.name} />
                    <div>{category.name}</div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>

            <hr style={{ borderTop: "2px solid black" }} />
          </div>
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
                <div className="lead">See your current location</div>
              ) : (
                <div className="lead">Set your location</div>
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
                  <p className="text-center mt-4">There are no stores found for this criteria</p>
                )}
              </>
            )}
          </Col>
        ) : (
          <Col>
            <h1 className="text-center mt-3 mb-4 display-4">
              {deliveryLocation ? "Stores delivering to your location" : "All available Stores"}
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
                      ? "There are currently no stores delivering to your location"
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
