import { Card, Form } from "react-bootstrap";
import { ProductState } from "../interfaces/product";
import { formatCurrency } from "../utils/currencyFormatter";
import { GrAddCircle } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useRef } from "react";

interface ProductItemProps {
  product: ProductState;
  canAddToCart: boolean;
  addToCart: (product: ProductState) => void;
  canManageProduct: boolean;
  editProduct: (product: ProductState) => void;
  deleteProduct: (product: ProductState) => void;
  onImageChange: (productId: number, imageFile: File | null) => void;
}

export function ProductItem({
  product,
  canAddToCart,
  addToCart,
  canManageProduct,
  editProduct,
  deleteProduct,
  onImageChange,
}: ProductItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current && canManageProduct) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.item(0);
    if (imageFile && canManageProduct) {
      onImageChange(product.id, imageFile);
    }
  };

  return (
    <Card className="h-100">
      <div>
        <Card.Img
          variant="top"
          src={product?.imageData || "/images/no-image.svg"}
          height="200px"
          style={{
            objectFit: "cover",
            cursor: canManageProduct ? "pointer" : "default",
          }}
          onClick={handleClick}
        />
        <Form.Control
          type="file"
          ref={fileInputRef}
          className="d-none"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
        />
        {canManageProduct && (
          <AiFillDelete
            onClick={() => deleteProduct(product)}
            style={{
              color: "red",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              top: 0,
              left: 0,
              transform: "translate(25%, 25%)",
              cursor: "pointer",
            }}
          />
        )}
        {canManageProduct && (
          <BiEdit
            onClick={() => editProduct(product)}
            style={{
              color: "orange",
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
