import { useEffect, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { OrderHistory } from "../components/OrderHistory";
import {
  getOrders,
  clearOrders,
  cancelOrder,
  reset,
} from "../features/orders/ordersSlice";
import { UserType } from "../interfaces/user";
import { StateStatus } from "../interfaces/state";
import { toast } from "react-toastify";

export function Orders() {
  const dispatch = useAppDispatch();
  const { orders, status, message } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(clearOrders());
    };
  }, []);

  useEffect(() => {
    if (status == StateStatus.Error) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

  const handleCancelOrder = (orderId: number) => {
    dispatch(cancelOrder(orderId));
  };

  const canManageOrders = useMemo(() => {
    if (!user) {
      return false;
    }

    return user.userType === UserType.Customer;
  }, [user]);

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <h1 className="text-center mt-3 mb-4">Order History</h1>
        {orders.length > 0 ? (
          <OrderHistory
            orders={orders}
            canManageOrders={canManageOrders}
            onCancelOrder={handleCancelOrder}
          />
        ) : (
          <p className="text-center mt-4">You have no orders</p>
        )}
      </Col>
    </Row>
  );
}
