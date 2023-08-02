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
  uploadImage as uploadProductImage,
} from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StoreRequestDto, StoreState } from "../interfaces/store";
import { StoreInfo } from "../components/StoreInfo";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
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
import {
  uploadImage as uploadStoreImage,
  updateStore,
  reset as resetStoresState,
} from "../features/stores/storesSlice";
import { CartItem } from "../interfaces/cart";
import { OrderRequestDto } from "../interfaces/order";
import { StateStatus, UserType } from "../interfaces/enums";
import { toast } from "react-toastify";
import { ProductModal } from "../components/ProductModal";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { ProductRequestDto, ProductState } from "../interfaces/product";
import { StoreModal } from "../components/StoreModal";

interface ModalProps {
  isVisible: boolean;
  content: any;
  action: any;
  payload: any;
}

export function StorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    stores,
    status: storesStatus,
    message: storesMessage,
  } = useAppSelector((state) => state.stores);
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
  const [selectedProduct, setSelectedProduct] = useState<ProductState | null>(
    null
  );
  const [confirmModal, setConfirmModal] = useState<ModalProps>({
    isVisible: false,
    content: "",
    action: null,
    payload: null,
  });
  const [storeModalVisible, setStoreModalVisible] = useState<boolean>(false);

  const store = useMemo<StoreState | null>(() => {
    const numberId = Number(id);
    if (!numberId) {
      return null;
    }

    const storeData = stores?.find((x) => x.id === numberId);

    if (!storeData) {
      return null;
    }

    return storeData;
  }, [id, stores]);

  const handleOpenModal = (product: ProductState | null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleSubmit = (data: ProductRequestDto) => {
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
    if (!store) {
      navigate("/");
    }

    return () => {
      dispatch(clearProducts());
      dispatch(closeCart());
    };
  }, [store]);

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

  useEffect(() => {
    if (storesStatus == StateStatus.Error) {
      toast.error(storesMessage);
    }

    return () => {
      dispatch(resetStoresState());
    };
  }, [storesStatus, storesMessage]);

  const submitOrder = (store: StoreState, items: CartItem[]) => {
    const requestDto: OrderRequestDto = {
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

  const canManageStore = useMemo(() => {
    if (!user) {
      return false;
    }

    if (user.userType != UserType.Partner) {
      return false;
    }

    return store?.partnerId === user.id;
  }, [user, store]);

  const handleDeleteProduct = (product: ProductState) => {
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

  const handleStoreImageChange = (imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadStoreImage({ storeId: store!.id, formData: formData }));
    }
  };

  const handleProductImageChange = (
    productId: number,
    imageFile: File | null
  ) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadProductImage({ productId, formData }));
    }
  };

  const handleStoreSubmit = (data: StoreRequestDto) => {
    dispatch(updateStore({ storeId: store!.id, requestDto: data }));
    setStoreModalVisible(false);
  };

  return (
    store && (
      <>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link onClick={() => history.back()} to="" className="text-reset">
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
            {canManageStore && (
              <div>
                <Button
                  variant="warning"
                  onClick={() => setStoreModalVisible(true)}
                  className="position-relative"
                >
                  <BiEdit className="fs-4" />
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleOpenModal(null)}
                  className="position-relative ms-2"
                >
                  <IoMdAddCircleOutline className="fs-4" />
                </Button>
              </div>
            )}
          </div>
          <StoreInfo
            store={store}
            canManageStore={canManageStore}
            onImageChange={handleStoreImageChange}
          />
        </div>
        <ProductList
          products={products}
          canAddToCart={canManageCart}
          addToCart={(product) => dispatch(addToCart(product))}
          canManageProduct={canManageStore}
          editProduct={(product) => handleOpenModal(product)}
          deleteProduct={(product) => handleDeleteProduct(product)}
          onImageChange={(productId, imageFile) =>
            handleProductImageChange(productId, imageFile)
          }
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
        <StoreModal
          onSubmit={handleStoreSubmit}
          isVisible={storeModalVisible}
          handleClose={() => setStoreModalVisible(false)}
          store={store}
        />
      </>
    )
  );
}
