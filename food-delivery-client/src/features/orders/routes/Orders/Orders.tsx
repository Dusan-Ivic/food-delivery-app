import { useEffect, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { OrderHistory } from "@/features/orders/components";
import { getOrders, clearOrders, cancelOrder } from "@/features/orders/slices";
import { StateStatus } from "@/interfaces/enums";
import { Spinner } from "@/components";
import { UserType } from "@/features/auth/types/enums";

export function Orders() {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch]);

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
        <h1 className="text-center mt-3 mb-4">Your Order History</h1>

        {status === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {orders.length > 0 ? (
              <OrderHistory
                orders={orders}
                canManageOrders={canManageOrders}
                onCancelOrder={handleCancelOrder}
              />
            ) : (
              <p className="text-center mt-4">You have no orders</p>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}
