import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getProductsByStore,
  clearProducts,
} from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Store } from "../interfaces/store";
import { StoreInfo } from "../components/StoreInfo";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { ProductList } from "../components/ProductList";
import { Button } from "react-bootstrap";
import { ShoppingCart } from "../components/ShoppingCart";
import {
  openCart,
  closeCart,
  clearCartItems,
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import {
  createOrder,
  reset as resetOrdersState,
} from "../features/orders/ordersSlice";
import { CartItem } from "../interfaces/cart";
import { CreateOrderRequestDto } from "../interfaces/order";
import { StateStatus } from "../interfaces/state";

export function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector((state) => state.stores);
  const { products } = useAppSelector((state) => state.products);
  const { status: ordersStatus, message: ordersMessage } = useAppSelector(
    (state) => state.orders
  );
  const { storeId, items } = useAppSelector((state) => state.cart);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const totalCartItems = useMemo(
    () => items.reduce((quantity, item) => item.quantity + quantity, 0),
    [items]
  );

  useEffect(() => {
    const numberId = Number(id);

    if (!numberId) {
      console.error("Invalid  id");
      navigate("/");
    } else {
      const storeData = stores.find((x) => x.id === numberId);
      if (storeData == null) {
        console.error("Store not found");
        navigate("/");
      } else {
        setStore(storeData);
      }
    }

    return () => {
      dispatch(clearProducts());
      dispatch(closeCart());
      dispatch(resetOrdersState());
    };
  }, [id]);

  useEffect(() => {
    if (store) {
      dispatch(getProductsByStore(store.id));
      dispatch(openCart(store.id));
    }
  }, [store]);

  useEffect(() => {
    if (ordersStatus == StateStatus.Error) {
      console.error(ordersMessage);
    }

    if (ordersStatus == StateStatus.Success) {
      dispatch(clearCartItems());
      setCartVisible(false);
    }
  }, [ordersStatus, ordersMessage]);

  const submitOrder = (storeId: number, items: CartItem[]) => {
    const requestDto: CreateOrderRequestDto = {
      storeId: storeId,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    dispatch(createOrder(requestDto));
  };

  return (
    store && (
      <>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/" className="text-reset">
              <IoArrowBack className="fs-3" />
            </Link>
            <Button
              onClick={() => setCartVisible(true)}
              className="position-relative"
            >
              <HiOutlineShoppingCart className="fs-4" />
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(40%, 40%)",
                }}
              >
                {totalCartItems}
              </div>
            </Button>
          </div>
          <StoreInfo store={store} />
        </div>
        <ProductList
          products={products}
          addToCart={(product) => dispatch(addToCart(product))}
        />
        {storeId && (
          <ShoppingCart
            storeId={storeId}
            items={items}
            isOpen={isCartVisible}
            closeCart={() => setCartVisible(false)}
            removeFromCart={(itemId) => dispatch(removeFromCart(itemId))}
            decreaseQuantity={(itemId) => dispatch(decreaseQuantity(itemId))}
            submitOrder={(storeId, items) => submitOrder(storeId, items)}
          />
        )}
      </>
    )
  );
}
