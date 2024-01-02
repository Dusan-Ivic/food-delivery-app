import { getStores, createStore, reset as resetStoresState } from "@/features/stores/slices";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { StateStatus } from "@/types/state";
import { getOrders, clearOrders, reset as resetOrdersState } from "@/features/orders/slices";
import { OrderHistory } from "@/features/orders/components";
import { StoreTable, StoreModal } from "@/features/stores/components";
import { Spinner } from "@/components";
import { PartnerStatus } from "@/features/partners/types/enums";
import { PartnerResponseDto } from "@/features/partners/types/response";

export function PartnerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    stores,
    status: storesStatus,
    message: storesMessage,
  } = useAppSelector((state) => state.stores);
  const {
    orders,
    status: ordersStatus,
    message: ordersMessage,
  } = useAppSelector((state) => state.orders);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      dispatch(getStores({ partnerId: user.id }));
      dispatch(getOrders());
    }

    return () => {
      dispatch(resetStoresState());
      dispatch(clearOrders());
    };
  }, [dispatch, user]);

  useEffect(() => {
    return () => {
      dispatch(resetStoresState());
    };
  }, [storesStatus, storesMessage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetOrdersState());
    };
  }, [ordersStatus, ordersMessage, dispatch]);

  const AlertComponent = ({
    status,
    children,
  }: {
    status: PartnerStatus;
    children: JSX.Element;
  }) => {
    switch (status) {
      case PartnerStatus.Pending:
        return (
          <Alert variant="warning">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Rejected:
        return (
          <Alert variant="danger">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Suspended:
        return (
          <Alert variant="danger">
            {children} You may be restricted from performing certain actions.
          </Alert>
        );
      case PartnerStatus.Accepted:
        return (
          <Alert variant="success">
            {children} You can now perform all store and product related actions.
          </Alert>
        );
    }
  };

  return (
    <Col>
      <Row>
        <AlertComponent status={(user as PartnerResponseDto).status}>
          <>Your current status is: {PartnerStatus[(user as PartnerResponseDto).status]}.</>
        </AlertComponent>
      </Row>

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button onClick={() => setModalVisible(true)} className="bg-success">
            <BsHouseAddFill className="fs-4" />
          </Button>
        </div>

        {storesStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {stores.length > 0 ? (
              <StoreTable stores={stores} />
            ) : (
              <p className="text-center mt-4"> You don't have any registered stores</p>
            )}
          </>
        )}
      </Row>

      <hr />

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Orders</h1>
        </div>

        {ordersStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {orders.length > 0 ? (
              <OrderHistory orders={orders} canManageOrders={false} />
            ) : (
              <p className="text-center mt-4">There are currently no orders</p>
            )}
          </>
        )}
      </Row>

      <StoreModal
        isVisible={isModalVisible}
        title="Add new store"
        onSubmit={(data) => dispatch(createStore(data))}
        onClose={() => setModalVisible(false)}
      />
    </Col>
  );
}
