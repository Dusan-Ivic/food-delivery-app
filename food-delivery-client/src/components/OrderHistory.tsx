import { Table } from "react-bootstrap";
import { OrderResponseDto as Order, OrderStatus } from "../interfaces/order";
import { formatCurrency } from "../utils/currencyFormatter";
import moment from "moment";
import { useState } from "react";
import { OrderModal } from "./OrderModal";
import { GoDotFill } from "react-icons/go";

interface OrderHistoryProps {
  orders: Order[];
  canManageOrders: boolean;
  onCancelOrder: (orderId: number) => void;
}

export function OrderHistory({
  orders,
  canManageOrders,
  onCancelOrder,
}: OrderHistoryProps) {
  const [modalOrder, setModalOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenOrder = (order: Order) => {
    if (order) {
      setModalVisible(true);
      setModalOrder(order);
    }
  };

  const handleCancelOrder = (orderId: number) => {
    setModalVisible(false);
    setModalOrder(null);
    onCancelOrder(orderId);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalOrder(null);
  };

  const orderStatusToColorMap = {
    [OrderStatus.Pending]: "gold",
    [OrderStatus.Canceled]: "red",
    [OrderStatus.Completed]: "green",
  };

  return (
    <>
      <Table striped className="text-center rounded rounded-3 overflow-hidden">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Store</th>
            <th>Creation date</th>
            <th>Creation time</th>
            <th>Status</th>
            <th>Total amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => handleOpenOrder(order)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <td>{order.id}</td>
              <td>{order.store?.name}</td>
              <td>{moment(order.createdAt).format("LL")}</td>
              <td>{moment(order.createdAt).format("LT")}</td>
              <td className="d-md-flex">
                <div className="w-auto h-100">
                  <GoDotFill
                    style={{
                      color: orderStatusToColorMap[order.orderStatus],
                    }}
                  />
                </div>
                <span className="d-none d-md-flex ps-0 ps-md-2 w-100">
                  {OrderStatus[order.orderStatus]}
                </span>
              </td>
              <td>{formatCurrency(order.totalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <OrderModal
        isVisible={modalVisible}
        order={modalOrder}
        handleClose={handleModalClose}
        canManageOrders={canManageOrders}
        onCancelOrder={handleCancelOrder}
      />
    </>
  );
}
