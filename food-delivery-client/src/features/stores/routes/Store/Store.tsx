import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { StoreInfo, StoreModal } from "@/features/stores/components";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { ProductList, ProductForm } from "@/features/products/components";
import { Button, Col, Row } from "react-bootstrap";
import { ShoppingCart } from "@/features/cart/components";
import { CartItem } from "@/features/cart/types/request";
import { toast } from "react-toastify";
import { ConfirmationModal, FormModal, FormProps } from "@/components";
import { FaLocationDot } from "react-icons/fa6";
import { useDeliveryLocation } from "@/features/delivery/hooks";
import { UserType } from "@/features/auth/types/enums";
import { StoreResponseDto } from "@/features/stores/types/response";
import { ProductResponseDto } from "@/features/products/types/response";
import { ProductRequestDto } from "@/features/products/types/request";
import { useAuthUser } from "@/features/auth/hooks";
import { useStore } from "@/features/stores/hooks";
import { useProducts } from "@/features/products/hooks";
import { UserState } from "@/features/auth/types/state";
import { useCart } from "@/features/cart/hooks";

interface ConfirmDeleteModalProps {
  isVisible: boolean;
  content: string;
  payload?: number;
}

export function StorePage() {
  const { id } = useParams();
  const { user } = useAuthUser();
  const { store, updateStore, uploadImage: uploadStoreImage } = useStore(id);
  const { items, addToCart, removeFromCart, decreaseQuantity, createCheckout } = useCart(id);
  const {
    products,
    createProduct,
    updateProduct,
    uploadImage: uploadProductImage,
    deleteProduct,
  } = useProducts(id);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponseDto | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmDeleteModalProps>({
    isVisible: false,
    content: "",
  });
  const [isStoreModalVisible, setStoreModalVisible] = useState<boolean>(false);
  const [isProductModalVisible, setProductModalVisible] = useState<boolean>(false);
  const { deliveryLocation } = useDeliveryLocation();

  useEffect(() => {
    setProductModalVisible(selectedProduct != null);
  }, [selectedProduct]);

  const submitOrder = (store: StoreResponseDto, items: CartItem[]) => {
    if (deliveryLocation?.coordinate && deliveryLocation?.address) {
      createCheckout({
        storeId: store.id,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        coordinate: deliveryLocation.coordinate,
        address: deliveryLocation.address,
      });
    } else {
      toast.warn("Please go back and set your location");
    }
  };

  const canManageCart = (user: UserState | null) => {
    return !user || user.userType === UserType.Customer;
  };

  const canManageStore = (user: UserState | null, store: StoreResponseDto) => {
    return user?.userType === UserType.Partner && store.partnerId === user?.id;
  };

  const handleSetDeleteProduct = (product: ProductResponseDto) => {
    setConfirmModal({
      isVisible: true,
      content: `You are about to delete product '${product.name}'`,
      payload: product.id,
    });
  };

  const handleConfirmDeleteProduct = () => {
    if (confirmModal.payload) {
      deleteProduct(confirmModal.payload);
    }

    setConfirmModal({
      isVisible: false,
      content: "",
    });
  };

  const handleCancelDeleteProduct = () => {
    setConfirmModal({
      isVisible: false,
      content: "",
    });
  };

  const handleStoreImageChange = (imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      uploadStoreImage(formData);
    }
  };

  const handleProductImageChange = (productId: number, imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      uploadProductImage(productId, formData);
    }
  };

  const handleSubmitProduct = (data: ProductRequestDto) => {
    if (store) {
      if (selectedProduct) {
        updateProduct(selectedProduct.id, { ...data, storeId: store.id });
      } else {
        createProduct({ ...data, storeId: store.id });
      }
    }
    setSelectedProduct(null);
    setProductModalVisible(false);
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
              {canManageCart(user) && (
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
                    {items.reduce((quantity, item) => item.quantity + quantity, 0)}
                  </div>
                </Button>
              )}
              {canManageStore(user, store) && (
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
            canManageStore={canManageStore(user, store)}
            onImageChange={handleStoreImageChange}
          />
        </div>

        {products.length > 0 ? (
          <ProductList
            products={products}
            canAddToCart={canManageCart(user)}
            addToCart={addToCart}
            canManageProduct={canManageStore(user, store)}
            editProduct={(product) => setSelectedProduct(product)}
            deleteProduct={handleSetDeleteProduct}
            onImageChange={handleProductImageChange}
          />
        ) : (
          <p className="text-center mt-4">There are currently no products in this store</p>
        )}

        <ShoppingCart
          store={store}
          items={items}
          isOpen={isCartVisible}
          closeCart={() => setCartVisible(false)}
          removeFromCart={removeFromCart}
          decreaseQuantity={decreaseQuantity}
          submitOrder={(store, items) => submitOrder(store, items)}
        />

        <ConfirmationModal
          isVisible={confirmModal.isVisible}
          content={confirmModal.content}
          onConfirm={handleConfirmDeleteProduct}
          onCancel={handleCancelDeleteProduct}
        />

        <FormModal
          isVisible={isProductModalVisible}
          title={selectedProduct ? "Update product" : "Add new product"}
          FormComponent={ProductFormComponent}
          data={selectedProduct as ProductRequestDto}
          onSubmit={handleSubmitProduct}
          onClose={() => {
            setSelectedProduct(null);
            setProductModalVisible(false);
          }}
        />

        <StoreModal
          isVisible={isStoreModalVisible}
          title="Update store"
          data={store}
          onSubmit={updateStore}
          onClose={() => setStoreModalVisible(false)}
        />
      </>
    )
  );
}
