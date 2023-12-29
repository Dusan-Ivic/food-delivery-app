import { Button, Col, Modal, Row, Stack } from "react-bootstrap";
import { formatCurrency } from "@/utils";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useMemo, useState } from "react";
import { OrderResponseDto } from "@/features/orders/types/response";
import { OrderStatus } from "@/features/orders/types/enums";
import moment from "moment";

interface OrderModalProps {
  isVisible: boolean;
  order: OrderResponseDto | null;
  handleClose: () => void;
  canManageOrders: boolean;
  onCancelOrder?: (orderId: number) => void;
}

export function OrderModal({
  isVisible,
  order,
  handleClose,
  canManageOrders,
  onCancelOrder,
}: OrderModalProps) {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(moment()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getDeliveryTime = (order: OrderResponseDto) => {
    return moment(order.createdAt).add(order.store.deliveryTimeInMinutes, "minutes");
  };

  const getFormattedDeliveryTime = useMemo(() => {
    if (!order) {
      return null;
    }

    const deliveryTime = getDeliveryTime(order);
    const duration = moment.duration(deliveryTime.diff(currentTime), "milliseconds");

    return moment.utc(duration.asMilliseconds()).format("mm:ss");
  }, [currentTime, order]);

  const getCurrentOrderStatus = (order: OrderResponseDto, timestamp: moment.Moment) => {
    if (!order) return undefined;

    if (order.orderStatus === OrderStatus.Canceled) {
      return OrderStatus.Canceled;
    } else if (getDeliveryTime(order).isAfter(timestamp)) {
      return OrderStatus.Pending;
    } else {
      return OrderStatus.Completed;
    }
  };

  const canCancelOrder =
    order !== null &&
    canManageOrders &&
    getCurrentOrderStatus(order, currentTime) === OrderStatus.Pending;

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
                  <div
                    className="me-3"
                    style={{
                      width: "70%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.productImage ? item.productImage : "/images/no-image.svg"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="w-100 d-flex flex-column justify-content-between py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fs-5">{item.productName}</div>
                      <div className="fs-5">&times;{item.quantity}</div>
                    </div>
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col>{formatCurrency(item.productPrice) || 0}</Col>
                      <Col className="text-center fs-4">
                        <MdOutlineKeyboardDoubleArrowRight />
                      </Col>
                      <Col className="text-end fw-bold">{formatCurrency(item.totalPrice)}</Col>
                    </Row>
                  </div>
                </div>
              </Row>
            ))}
            <Row className="fw-bold">
              <Col>
                <div className="ms-auto fs-4">Total: {formatCurrency(order.totalPrice)}</div>
                <div>Items: {formatCurrency(order.itemsPrice)}</div>
                <div className="text-muted">Delivery fee: {formatCurrency(order.deliveryFee)}</div>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-baseline">
                <div>
                  {getCurrentOrderStatus(order, currentTime) === OrderStatus.Pending && (
                    <>
                      <div>
                        Delivering to:
                        <div className="text-muted">{order.address}</div>
                      </div>
                      <div>In: {getFormattedDeliveryTime}</div>
                    </>
                  )}
                  {getCurrentOrderStatus(order, currentTime) === OrderStatus.Completed && (
                    <>
                      <div>
                        Delivered to:
                        <div className="text-muted">{order.address}</div>
                      </div>
                      <div>{getDeliveryTime(order).from(currentTime)}</div>
                    </>
                  )}
                  {getCurrentOrderStatus(order, currentTime) === OrderStatus.Canceled && (
                    <>
                      <div>
                        Delivery to
                        <div className="text-muted">{order.address}</div>
                      </div>
                      <div className="text-danger">Canceled</div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            {canCancelOrder && (
              <Row>
                <Button
                  onClick={() => onCancelOrder!(order.id)}
                  variant="danger text-white d-flex justify-content-center align-items-center"
                >
                  Cancel Order <ImCancelCircle className="ms-2 fs-5" />
                </Button>
              </Row>
            )}
          </Stack>
        </Modal.Body>
      </Modal>
    )
  );
}
