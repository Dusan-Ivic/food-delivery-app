import { Table } from "react-bootstrap";
import { OrderResponseDto as Order } from "../interfaces/order";
import { formatCurrency } from "../utils/currencyFormatter";
import moment from "moment";
import { useState } from "react";
import { OrderModal } from "./OrderModal";

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

  const getOrderStatus = (order: Order) => {
    if (order.isCanceled) {
      return "Canceled";
    } else if (moment(order.createdAt).add(30, "m").isAfter()) {
      return "Pending";
    } else {
      return "Completed";
    }
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
              <td>{order.storeName}</td>
              <td>{moment(order.createdAt).format("LL")}</td>
              <td>{moment(order.createdAt).format("LT")}</td>
              <td>{getOrderStatus(order)}</td>
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
