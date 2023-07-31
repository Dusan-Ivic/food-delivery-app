import { Card } from "react-bootstrap";
import { Product } from "../interfaces/product";
import { formatCurrency } from "../utils/currencyFormatter";
import { GrAddCircle } from "react-icons/gr";
import { BiEdit } from "react-icons/bi"

interface ProductItemProps {
  product: Product;
  canAddToCart: boolean;
  addToCart: (product: Product) => void;
  canManageProduct: boolean;
  editProduct: (product: Product) => void;
}

export function ProductItem({
  product,
  canAddToCart,
  addToCart,
  canManageProduct,
  editProduct,
}: ProductItemProps) {
  return (
    <Card className="h-100">
      <div>
        <Card.Img
          variant="top"
          src={"https://placehold.co/900x600?text=No+Image"}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        {canManageProduct && (
          <BiEdit
            onClick={() => editProduct(product)}
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(-25%, 25%)",
              cursor: "pointer",
            }}
          />
        )}
        {canAddToCart && (
          <GrAddCircle
            onClick={() => addToCart(product)}
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(-25%, 25%)",
              cursor: "pointer",
            }}
          />
        )}
      </div>
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
