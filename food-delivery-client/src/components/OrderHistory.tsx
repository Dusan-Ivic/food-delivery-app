import { Table } from "react-bootstrap";
import { OrderState } from "../interfaces/order";
import { OrderStatus } from "../interfaces/enums";
import { formatCurrency } from "../utils/currencyFormatter";
import moment from "moment";
import { useState } from "react";
import { OrderModal } from "./OrderModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineX, HiOutlineCheck } from "react-icons/hi";

interface OrderHistoryProps {
  orders: OrderState[];
  canManageOrders: boolean;
  onCancelOrder?: (orderId: number) => void;
}

export function OrderHistory({
  orders,
  canManageOrders,
  onCancelOrder,
}: OrderHistoryProps) {
  const [modalOrder, setModalOrder] = useState<OrderState | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenOrder = (order: OrderState) => {
    if (order) {
      setModalVisible(true);
      setModalOrder(order);
    }
  };

  const handleCancelOrder = (orderId: number) => {
    setModalVisible(false);
    setModalOrder(null);
    onCancelOrder!(orderId);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalOrder(null);
  };

  const statusToIconMap = {
    [OrderStatus.Pending]: (
      <HiOutlineDotsHorizontal className="fs-5" style={{ color: "orange" }} />
    ),
    [OrderStatus.Canceled]: (
      <HiOutlineX className="fs-5" style={{ color: "red" }} />
    ),
    [OrderStatus.Completed]: (
      <HiOutlineCheck className="fs-4" style={{ color: "green" }} />
    ),
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
              <td>{statusToIconMap[order.orderStatus]}</td>
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
