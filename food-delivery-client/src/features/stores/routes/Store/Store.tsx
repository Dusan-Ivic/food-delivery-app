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
} from "@/features/products/slices";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { StoreInfo, StoreModal } from "@/features/stores/components";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { ProductList, ProductForm } from "@/features/products/components";
import { Button, Col, Row } from "react-bootstrap";
import { ShoppingCart } from "@/features/cart/components";
import {
  openCart,
  closeCart,
  clearCartItems,
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "@/features/cart/slices";
import { createCheckout, reset as resetOrdersState } from "@/features/orders/slices";
import {
  uploadImage as uploadStoreImage,
  updateStore,
  reset as resetStoresState,
} from "@/features/stores/slices";
import { CartItem } from "@/features/cart/types/request";
import { StateStatus } from "@/types/state";
import { toast } from "react-toastify";
import { ConfirmationModal, FormModal, FormProps, Spinner } from "@/components";
import { FaLocationDot } from "react-icons/fa6";
import { useDeliveryLocation } from "@/features/delivery/hooks";
import { UserType } from "@/features/auth/types/enums";
import { StoreResponseDto } from "@/features/stores/types/response";
import { OrderRequestDto } from "@/features/orders/types/request";
import { CheckoutResponseDto } from "@/features/orders/types/response";
import { ProductResponseDto } from "@/features/products/types/response";
import { ProductRequestDto } from "@/features/products/types/request";

interface ConfirmDeleteModalProps {
  isVisible: boolean;
  content: string;
  payload?: number;
}

export function StorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stores } = useAppSelector((state) => state.stores);
  const { products, status: productsStatus } = useAppSelector((state) => state.products);
  const { status: ordersStatus, message: ordersMessage } = useAppSelector((state) => state.orders);
  const { items } = useAppSelector((state) => state.cart);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const totalCartItems = useMemo(
    () => items.reduce((quantity, item) => item.quantity + quantity, 0),
    [items]
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductResponseDto | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmDeleteModalProps>({
    isVisible: false,
    content: "",
  });
  const [isStoreModalVisible, setStoreModalVisible] = useState<boolean>(false);
  const [isProductModalVisible, setProductModalVisible] = useState<boolean>(false);
  const { deliveryLocation } = useDeliveryLocation();

  const store = useMemo<StoreResponseDto | null>(() => {
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

  useEffect(() => {
    setProductModalVisible(selectedProduct != null);
  }, [selectedProduct]);

  useEffect(() => {
    if (store) {
      dispatch(getProductsByStore(store.id));
      dispatch(openCart(store.id));
    } else {
      navigate("/");
    }
  }, [store, dispatch, navigate]);

  useEffect(() => {
    if (ordersStatus == StateStatus.Success) {
      dispatch(clearCartItems());
      setCartVisible(false);
    }
  }, [ordersStatus, ordersMessage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetOrdersState());
      dispatch(resetProductsState());
      dispatch(resetStoresState());
      dispatch(closeCart());
      dispatch(clearProducts());
    };
  }, [dispatch]);

  const submitOrder = (store: StoreResponseDto, items: CartItem[]) => {
    if (deliveryLocation?.coordinate && deliveryLocation?.address) {
      const requestDto: OrderRequestDto = {
        storeId: store.id,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        coordinate: deliveryLocation.coordinate,
        address: deliveryLocation.address,
      };

      dispatch(createCheckout(requestDto)).then((value) => {
        console.log(value);
        const payload = value.payload as CheckoutResponseDto;
        window.location.href = payload.sessionUrl;
      });
    } else {
      toast.warn("Please go back and set your location");
    }
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

  const handleDeleteProduct = (product: ProductResponseDto) => {
    setConfirmModal({
      isVisible: true,
      content: `You are about to delete product '${product.name}'`,
      payload: product.id,
    });
  };

  const handleConfirm = () => {
    const { payload } = confirmModal;
    if (payload) {
      dispatch(deleteProduct(payload));
    }

    setConfirmModal({
      isVisible: false,
      content: "",
    });
  };

  const handleCancel = () => {
    setConfirmModal({
      isVisible: false,
      content: "",
    });
  };

  const handleStoreImageChange = (imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadStoreImage({ storeId: store!.id, formData: formData }));
    }
  };

  const handleProductImageChange = (productId: number, imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadProductImage({ productId, formData }));
    }
  };

  const ProductFormComponent = ({ data, onSubmit }: FormProps<ProductRequestDto>) => {
    return <ProductForm product={data} onSubmit={onSubmit} />;
  };

  return (
    store && (
      <>
        <div className="mb-4">
          <Row className="d-flex justify-content-between align-items-center mb-3">
            <Col>
              <Link onClick={() => history.back()} to="" className="text-reset">
                <IoArrowBack className="fs-3" />
              </Link>
            </Col>

            {(!user || user?.userType === UserType.Customer) && (
              <Col className="d-flex justify-content-center">
                <div className="d-flex gap-1 align-items-center">
                  <FaLocationDot style={{ fontSize: "24px" }} />
                  {deliveryLocation ? (
                    <div className="lead">Your location is set</div>
                  ) : (
                    <Link to="/stores" className="text-reset text-decoration-none lead">
                      Go back and set location
                    </Link>
                  )}
                </div>
              </Col>
            )}

            <Col className="d-flex justify-content-end">
              {canManageCart && (
                <Button onClick={() => setCartVisible(true)} className="position-relative">
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
                    onClick={() => setProductModalVisible(true)}
                    className="position-relative ms-2"
                  >
                    <IoMdAddCircleOutline className="fs-4" />
                  </Button>
                </div>
              )}
            </Col>
          </Row>

          <StoreInfo
            store={store}
            canManageStore={canManageStore}
            onImageChange={handleStoreImageChange}
          />
        </div>

        {productsStatus === StateStatus.Loading ? (
          <Spinner />
        ) : (
          <>
            {products.length > 0 ? (
              <ProductList
                products={products}
                canAddToCart={canManageCart}
                addToCart={(product) => dispatch(addToCart(product))}
                canManageProduct={canManageStore}
                editProduct={(product) => setSelectedProduct(product)}
                deleteProduct={(product) => handleDeleteProduct(product)}
                onImageChange={(productId, imageFile) =>
                  handleProductImageChange(productId, imageFile)
                }
              />
            ) : (
              <p className="text-center mt-4">There are currently no products in this store</p>
            )}
          </>
        )}

        <ShoppingCart
          store={store}
          items={items}
          isOpen={isCartVisible}
          isLoading={ordersStatus === StateStatus.Loading}
          closeCart={() => setCartVisible(false)}
          removeFromCart={(itemId) => dispatch(removeFromCart(itemId))}
          decreaseQuantity={(itemId) => dispatch(decreaseQuantity(itemId))}
          submitOrder={(store, items) => submitOrder(store, items)}
        />

        <ConfirmationModal
          isVisible={confirmModal.isVisible}
          content={confirmModal.content}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />

        <FormModal
          isVisible={isProductModalVisible}
          title={selectedProduct ? "Update product" : "Add new product"}
          FormComponent={ProductFormComponent}
          data={selectedProduct as ProductRequestDto}
          onSubmit={(data) => {
            selectedProduct
              ? dispatch(
                  updateProduct({
                    productId: selectedProduct.id,
                    requestDto: { ...data, storeId: store.id },
                  })
                )
              : dispatch(createProduct({ ...data, storeId: store.id }));
            setSelectedProduct(null);
            setProductModalVisible(false);
          }}
          onClose={() => {
            setSelectedProduct(null);
            setProductModalVisible(false);
          }}
        />

        <StoreModal
          isVisible={isStoreModalVisible}
          title="Update store"
          data={store}
          onSubmit={(data) => dispatch(updateStore({ storeId: store.id, requestDto: data }))}
          onClose={() => setStoreModalVisible(false)}
        />
      </>
    )
  );
}
