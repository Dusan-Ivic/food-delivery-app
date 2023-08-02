import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
import { OrderState } from "../interfaces/order";
import { OrderStatus } from "../interfaces/enums";
import { formatCurrency } from "../utils/currencyFormatter";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useMemo } from "react";

interface OrderModalProps {
  isVisible: boolean;
  order: OrderState | null;
  handleClose: () => void;
  canManageOrders: boolean;
  onCancelOrder: (orderId: number) => void;
}

export function OrderModal({
  isVisible,
  order,
  handleClose,
  canManageOrders,
  onCancelOrder,
}: OrderModalProps) {
  const canCancelOrder = useMemo(() => {
    if (!order) {
      return false;
    }

    if (!canManageOrders) {
      return false;
    }

    return order.orderStatus === OrderStatus.Pending;
  }, [order]);

  return (
    order && (
      <Modal show={isVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order from {order.store.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3} className="p-3">
            {order.items.map((item) => (
              <Row key={item.productId}>
                <div className="d-flex">
                  <img
                    src={item.product.imageData || "/images/no-image.svg"}
                    style={{ width: "40%" }}
                    className="me-3"
                  />
                  <div className="w-100 d-flex flex-column justify-content-between py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fs-5">{item.product.name}</div>
                      <div className="fs-5">&times;{item.quantity}</div>
                    </div>
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col>{formatCurrency(item.product.price) || 0}</Col>
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
              <Col>
                <div className="ms-auto fs-4">
                  Total: {formatCurrency(order.totalPrice)}
                </div>
                <div>Items: {formatCurrency(order.itemsPrice)}</div>
                <div className="text-muted">
                  Delivery fee: {formatCurrency(order.deliveryFee)}
                </div>
              </Col>
              {canCancelOrder && (
                <Col className="h-100 w-100 d-flex justify-content-end align-items-end">
                  <Button
                    onClick={() => onCancelOrder(order.id)}
                    variant="danger text-white d-flex align-items-center"
                  >
                    Cancel Order <ImCancelCircle className="ms-2 fs-5" />
                  </Button>
                </Col>
              )}
            </Row>
          </Stack>
        </Modal.Body>
      </Modal>
    )
  );
}
