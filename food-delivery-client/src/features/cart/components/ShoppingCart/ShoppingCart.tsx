import { useMemo } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { formatCurrency } from "@/utils";
import { StoreResponseDto } from "@/features/stores/types/response";
import { CartItem } from "@/features/cart/types/request";
import { ShoppingCartItem } from "@/features/cart/components";

interface ShoppingCartProps {
  store: StoreResponseDto;
  items: CartItem[];
  isOpen: boolean;
  closeCart: () => void;
  removeFromCart: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  submitOrder: (store: StoreResponseDto, items: CartItem[]) => void;
}

export function ShoppingCart({
  store,
  items,
  isOpen,
  closeCart,
  removeFromCart,
  decreaseQuantity,
  submitOrder,
}: ShoppingCartProps) {
  const totalPrice = useMemo(
    () =>
      items.reduce((total, cartItem) => {
        const item = items.find((i) => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0),
    [items]
  );

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          <Stack gap={2} className="d-flex flex-column justify-content-between">
            <Stack gap={3}>
              {items.map((item) => (
                <ShoppingCartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </Stack>
            <div className="ms-auto fw-bold text-muted">
              Items price: {formatCurrency(totalPrice)}
            </div>
            <div className="ms-auto fw-bold text-muted">
              Delivery fee: {formatCurrency(store.deliveryFee)}
            </div>
            <div className="ms-auto fw-bold fs-5">
              Total price: {formatCurrency(totalPrice + store.deliveryFee)}
            </div>
            <Button onClick={() => submitOrder(store, items)} className="w-100 mt-2 mb-5">
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
