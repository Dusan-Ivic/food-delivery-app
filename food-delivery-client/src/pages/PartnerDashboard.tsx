import { getStores, createStore, reset } from "../features/stores/storesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";
import { StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { StoreRequestDto } from "../interfaces/store";
import { FormModal, FormProps } from "../components/FormModal";
import { StoreForm } from "../components/forms";
import { getOrders, clearOrders } from "../features/orders/ordersSlice";
import { OrderHistory } from "../components/OrderHistory";
import { StoreTable } from "../components/StoreTable";

export function PartnerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    stores,
    status: storesStatus,
    message: storesMessage,
  } = useAppSelector((state) => state.stores);
  const { orders } = useAppSelector((state) => state.orders);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      dispatch(getStores(user.id));
      dispatch(getOrders());
    }

    return () => {
      dispatch(reset());
      dispatch(clearOrders());
    };
  }, []);

  useEffect(() => {
    if (storesStatus == StateStatus.Error) {
      toast.error(storesMessage);
    }

    return () => {
      dispatch(reset());
    };
  }, [storesStatus, storesMessage]);

  const FormComponent = ({ data, onSubmit }: FormProps<StoreRequestDto>) => {
    return <StoreForm store={data} onSubmit={onSubmit} />;
  };

  return (
    <Row>
      <Col>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Your Stores</h1>
          <Button onClick={() => setModalVisible(true)} className="bg-success">
            <BsHouseAddFill className="fs-4" />
          </Button>
        </div>

        {stores.length > 0 ? (
          <StoreTable stores={stores} />
        ) : (
          <p className="text-center mt-4">
            You don't have any registered stores
          </p>
        )}
      </Col>

      <hr />

      <Col>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-center mt-3 mb-3">Orders</h1>
        </div>
        {orders.length > 0 ? (
          <OrderHistory orders={orders} canManageOrders={false} />
        ) : (
          <p className="text-center mt-4">
            There are currently no registered partners
          </p>
        )}
      </Col>

      <FormModal
        isVisible={isModalVisible}
        title="Add new store"
        FormComponent={FormComponent}
        data={null}
        onSubmit={(data) => dispatch(createStore(data))}
        onClose={() => setModalVisible(false)}
      />
    </Row>
  );
}
