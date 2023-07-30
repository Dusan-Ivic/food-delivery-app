import { Button, Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "../interfaces/cart";

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  closeCart: () => void;
  createOrder: () => void;
}

export function ShoppingCart({
  items,
  isOpen,
  closeCart,
  createOrder,
}: ShoppingCartProps) {
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        {items.length > 0 ? (
          <Stack gap={3}>
            {items.map((item) => (
              <div>{item.productId}</div>
            ))}
            <div className="ms-auto fw-bold fs-5">Total {0}</div>
            <Button onClick={createOrder} className="w-100 mt-3 mb-5">
              Place an order
            </Button>
          </Stack>
        ) : (
          <p>Your shopping cart is empty. Add some items...</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
