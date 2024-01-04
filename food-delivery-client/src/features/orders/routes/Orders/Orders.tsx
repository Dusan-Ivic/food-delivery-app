import { Row, Col } from "react-bootstrap";
import { OrderHistory } from "@/features/orders/components";
import { UserType } from "@/features/auth/types/enums";
import { useAuthUser } from "@/features/auth/hooks";
import { useOrders } from "@/features/orders/hooks";
import { UserState } from "@/features/auth/types/state";

export function Orders() {
  const { orders, cancelOrder } = useOrders();
  const { user } = useAuthUser();

  const canManageOrders = (user: UserState | null) => {
    return user?.userType === UserType.Customer;
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <h1 className="text-center mt-3 mb-4">Your Order History</h1>
        {orders.length > 0 ? (
          <OrderHistory
            orders={orders}
            canManageOrders={canManageOrders(user)}
            onCancelOrder={cancelOrder}
          />
        ) : (
          <p className="text-center mt-4">You have no orders</p>
        )}
      </Col>
    </Row>
  );
}
