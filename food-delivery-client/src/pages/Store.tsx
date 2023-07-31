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
import { IoMdAddCircleOutline } from "react-icons/io"
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
import { toast } from "react-toastify";
import { UserType } from "../interfaces/user";
import { ProductFormData } from "../interfaces/product";
import { ProductModal } from "../components/ProductModal";
import { createProduct } from "../features/products/productsSlice"

export function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores } = useAppSelector((state) => state.stores);
  const { products, status: productsStatus, message: productsMessage } = useAppSelector((state) => state.products);
  const { status: ordersStatus, message: ordersMessage } = useAppSelector(
    (state) => state.orders
  );
  const { items } = useAppSelector((state) => state.cart);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const totalCartItems = useMemo(
    () => items.reduce((quantity, item) => item.quantity + quantity, 0),
    [items]
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (data: ProductFormData) => {
    dispatch(createProduct({...data, storeId: store!.id}));
    setModalVisible(false);
  };

  useEffect(() => {
    const numberId = Number(id);

    if (!numberId) {
      toast.error("Invalid store id");
      navigate("/");
    } else {
      const storeData = stores.find((x) => x.id === numberId);
      if (storeData == null) {
        toast.error("Store not found");
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
      toast.error(ordersMessage);
    }

    if (ordersStatus == StateStatus.Success) {
      dispatch(clearCartItems());
      setCartVisible(false);
    }
  }, [ordersStatus, ordersMessage]);

  useEffect(() => {
    if (productsStatus == StateStatus.Error) {
      toast.error(productsMessage);
    }

  }, [productsStatus, productsMessage]);

  const submitOrder = (store: Store, items: CartItem[]) => {
    const requestDto: CreateOrderRequestDto = {
      storeId: store.id,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    dispatch(createOrder(requestDto));
  };

  const canManageCart = useMemo(() => {
    if (!user) {
      return false;
    }

    return user.userType == UserType.Customer;
  }, [user]);

  const canManageProducts = useMemo(() => {
    if (!user) {
      return false;
    }

    if (user.userType != UserType.Partner) {
      return false;
    }

    return store?.partnerId === user.id;
  }, [user, store]);

  return (
    store && (
      <>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/" className="text-reset">
              <IoArrowBack className="fs-3" />
            </Link>
            {canManageCart && (
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
            )}
            {canManageProducts && (
              <Button
                onClick={() => handleOpenModal()}
                className="position-relative"
              >
                <IoMdAddCircleOutline className="fs-4" />
              </Button>
            )}
          </div>
          <StoreInfo store={store} />
        </div>
        <ProductList
          products={products}
          canAddToCart={canManageCart}
          addToCart={(product) => dispatch(addToCart(product))}
        />
        <ShoppingCart
          store={store}
          items={items}
          isOpen={isCartVisible}
          closeCart={() => setCartVisible(false)}
          removeFromCart={(itemId) => dispatch(removeFromCart(itemId))}
          decreaseQuantity={(itemId) => dispatch(decreaseQuantity(itemId))}
          submitOrder={(store, items) => submitOrder(store, items)}
        />
        <ProductModal
          onSubmit={handleSubmit}
          isVisible={modalVisible}
          handleClose={handleCloseModal}
        />
      </>
    )
  );
}
