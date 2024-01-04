import { useAuthUser } from "@/features/auth/hooks";
import { CartItem } from "@/features/cart/types/request";
import { CartState } from "@/features/cart/types/state";
import ordersService from "@/features/orders/api";
import { OrderRequestDto } from "@/features/orders/types/request";
import { ProductResponseDto } from "@/features/products/types/response";
import { useState } from "react";

export function useCart(storeId?: string) {
  const { accessToken } = useAuthUser();
  const [cart, setCart] = useState<CartState>({
    storeId,
    items: [],
  });

  const clearItems = () => {
    if (cart) {
      setCart({
        ...cart,
        items: [],
      });
    }
  };

  const addToCart = (product: ProductResponseDto) => {
    if (cart) {
      const cartItem = cart.items.find((item) => item.id === product.id);
      if (cartItem) {
        setCart({
          storeId: cart.storeId,
          items: cart.items.map((item) => {
            if (item.id === product.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return item;
          }),
        });
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        };
        setCart({ ...cart, items: [...cart.items, newItem] });
      }
    }
  };

  const removeFromCart = (productId: number) => {
    if (cart) {
      setCart({
        ...cart,
        items: cart.items.filter((item) => item.id !== productId),
      });
    }
  };

  const decreaseQuantity = (productId: number) => {
    if (cart) {
      setCart({
        ...cart,
        items: cart.items
          .map((item) => {
            if (item.id === productId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      });
    }
  };

  const createCheckout = async (data: OrderRequestDto) => {
    if (accessToken) {
      const response = await ordersService.createCheckout(data, accessToken.payload);
      clearItems();
      window.location.href = response.sessionUrl;
    }
  };

  return {
    cart,
    items: cart.items,
    clearItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    createCheckout,
  };
}
