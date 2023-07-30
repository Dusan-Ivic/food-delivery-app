import { Card } from "react-bootstrap";
import { Product } from "../interfaces/product";
import { formatCurrency } from "../utils/currencyFormatter";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={"https://placehold.co/900x600?text=No+Image"}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{product.name}</span>
          <span className="ms-2 text-muted">
            {formatCurrency(product.price)}
          </span>
        </Card.Title>
        <div>{product.description}</div>
      </Card.Body>
    </Card>
  );
}
