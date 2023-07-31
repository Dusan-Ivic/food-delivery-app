import { Row, Col } from "react-bootstrap";
import { Product } from "../interfaces/product";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: Product[];
  canAddToCart: boolean;
  addToCart: (product: Product) => void;
}

export function ProductList({
  products,
  canAddToCart,
  addToCart,
}: ProductListProps) {
  return (
    <Row md={2} xs={1} lg={2} xl={3} className="g-3">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductItem
            product={product}
            canAddToCart={canAddToCart}
            addToCart={addToCart}
          />
        </Col>
      ))}
    </Row>
  );
}
