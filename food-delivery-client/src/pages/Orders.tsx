import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { OrderHistory } from "../components/OrderHistory";
import { getOrders, clearOrders } from "../features/orders/ordersSlice";

export function Orders() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(clearOrders());
    };
  }, []);

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <h1 className="text-center mt-3 mb-4">Order History</h1>
        {orders.length > 0 ? (
          <OrderHistory orders={orders} />
        ) : (
          <p className="text-center mt-4">You have no orders</p>
        )}
      </Col>
    </Row>
  );
}
