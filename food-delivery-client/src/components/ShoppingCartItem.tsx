import { Button, Stack } from "react-bootstrap";
import { CartItem } from "../interfaces/cart";
import { formatCurrency } from "../utils/currencyFormatter";

interface ShoppingCartItemProps {
  item: CartItem;
  removeFromCart: (itemId: number) => void;
}

export function ShoppingCartItem({
  item,
  removeFromCart,
}: ShoppingCartItemProps) {
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * item.quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
