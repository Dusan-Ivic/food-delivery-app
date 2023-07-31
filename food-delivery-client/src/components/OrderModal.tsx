import { Col, Modal, Row, Stack } from "react-bootstrap";
import { OrderResponseDto as Order } from "../interfaces/order";
import { formatCurrency } from "../utils/currencyFormatter";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface OrderModalProps {
  isVisible: boolean;
  order: Order | null;
  handleClose: () => void;
}

export function OrderModal({ isVisible, order, handleClose }: OrderModalProps) {
  return (
    order && (
      <Modal show={isVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order from {order.storeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3} className="p-3">
            {order.items.map((item) => (
              <Row key={item.productId}>
                <div className="d-flex">
                  <img
                    src={"https://placehold.co/900x600?text=No+Image"}
                    style={{ width: "40%" }}
                    className="me-3"
                  />
                  <div className="w-100 d-flex flex-column justify-content-between py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fs-5">{item.productName}</div>
                      <div className="fs-5">&times;{item.quantity}</div>
                    </div>
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col>{formatCurrency(item.productPrice)}</Col>
                      <Col className="text-center fs-4">
                        <MdOutlineKeyboardDoubleArrowRight />
                      </Col>
                      <Col className="text-end fw-bold">
                        {formatCurrency(item.totalPrice)}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Row>
            ))}
            <Row className="fw-bold">
              <div className="ms-auto fs-4">
                Total: {formatCurrency(order.totalPrice)}
              </div>
              <div>Items: {formatCurrency(order.itemsPrice)}</div>
              <div className="text-muted">
                Delivery fee: {formatCurrency(order.deliveryFee)}
              </div>
            </Row>
          </Stack>
        </Modal.Body>
      </Modal>
    )
  );
}
