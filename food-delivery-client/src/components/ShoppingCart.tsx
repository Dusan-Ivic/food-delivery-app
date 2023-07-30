import { Button, Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "../interfaces/cart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { formatCurrency } from "../utils/currencyFormatter";

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  closeCart: () => void;
  removeFromCart: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
}

export function ShoppingCart({
  items,
  isOpen,
  closeCart,
  removeFromCart,
  decreaseQuantity,
}: ShoppingCartProps) {
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          <Stack gap={3} className="d-flex flex-column justify-content-between">
            {items.map((item) => (
              <ShoppingCartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                decreaseQuantity={decreaseQuantity}
              />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                items.reduce((total, cartItem) => {
                  const item = items.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
            <Button className="w-100 mt-3 mb-5">Place an order</Button>
          </Stack>
        ) : (
          <p>Your shopping cart is empty. Add some items...</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
