import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getProductsByStore,
  createProduct,
  updateProduct,
  reset as resetProductsState,
  clearProducts,
  deleteProduct,
} from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Store } from "../interfaces/store";
import { StoreInfo } from "../components/StoreInfo";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
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
import { Product, ProductFormData } from "../interfaces/product";
import { ProductModal } from "../components/ProductModal";
import { ConfirmationModal } from "../components/ConfirmationModal";

interface ModalProps {
  isVisible: boolean;
  content: any;
  action: any;
  payload: any;
}

export function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores } = useAppSelector((state) => state.stores);
  const {
    products,
    status: productsStatus,
    message: productsMessage,
  } = useAppSelector((state) => state.products);
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmModal, setConfirmModal] = useState<ModalProps>({
    isVisible: false,
    content: "",
    action: null,
    payload: null,
  });

  const handleOpenModal = (product: Product | null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleSubmit = (data: ProductFormData) => {
    if (selectedProduct) {
      dispatch(
        updateProduct({
          data: { ...data, storeId: selectedProduct.storeId },
          productId: selectedProduct.id,
        })
      );
    } else {
      dispatch(createProduct({ ...data, storeId: store!.id }));
    }
    setModalVisible(false);
    setSelectedProduct(null);
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

    return () => {
      dispatch(resetOrdersState());
    };
  }, [ordersStatus, ordersMessage]);

  useEffect(() => {
    if (productsStatus == StateStatus.Error) {
      toast.error(productsMessage);
    }

    return () => {
      dispatch(resetProductsState());
    };
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

  const handleDeleteProduct = (product: Product) => {
    setConfirmModal({
      isVisible: true,
      content: `You are about to delete product '${product.name}'`,
      action: deleteProduct,
      payload: product.id,
    });
  };

  const handleConfirm = () => {
    dispatch(confirmModal.action(confirmModal.payload));
    setConfirmModal({
      isVisible: false,
      content: "",
      action: null,
      payload: null,
    });
  };

  const handleCancel = () => {
    setConfirmModal({
      isVisible: false,
      content: "",
      action: null,
      payload: null,
    });
  };

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
                onClick={() => handleOpenModal(null)}
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
          canManageProduct={canManageProducts}
          editProduct={(product) => handleOpenModal(product)}
          deleteProduct={(productId) => handleDeleteProduct(productId)}
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
          product={selectedProduct}
        />
        <ConfirmationModal
          isVisible={confirmModal.isVisible}
          content={confirmModal.content}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </>
    )
  );
}
