import { Table } from "react-bootstrap";
import { OrderResponseDto as Order } from "../interfaces/order";
import { formatCurrency } from "../utils/currencyFormatter";
import moment from "moment";

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Table striped className="text-center rounded rounded-3 overflow-hidden">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Store</th>
          <th>Creation date</th>
          <th>Creation time</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.store?.name}</td>
            <td>{moment(order.createdAt).format("LL")}</td>
            <td>{moment(order.createdAt).format("LT")}</td>
            <td>{formatCurrency(order.totalPrice)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
