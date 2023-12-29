import { ProductItem } from "@/features/products/components";
import { ProductResponseDto } from "@/features/products/types/response";
import { Row, Col } from "react-bootstrap";

interface ProductListProps {
  products: ProductResponseDto[];
  canAddToCart: boolean;
  addToCart: (product: ProductResponseDto) => void;
  canManageProduct: boolean;
  editProduct: (product: ProductResponseDto) => void;
  deleteProduct: (product: ProductResponseDto) => void;
  onImageChange: (productId: number, imageFile: File | null) => void;
}

export function ProductList({
  products,
  canAddToCart,
  addToCart,
  canManageProduct,
  editProduct,
  deleteProduct,
  onImageChange,
}: ProductListProps) {
  return (
    <Row md={2} xs={1} lg={2} xl={3} className="g-3">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductItem
            product={product}
            canAddToCart={canAddToCart}
            addToCart={addToCart}
            canManageProduct={canManageProduct}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            onImageChange={onImageChange}
          />
        </Col>
      ))}
    </Row>
  );
}
