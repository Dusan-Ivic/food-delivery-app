import { Card, Form } from "react-bootstrap";
import { formatCurrency } from "@/utils";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlinePlusSquare } from "react-icons/ai";
import { useRef } from "react";
import { ProductResponseDto } from "@/features/products/types/response";

interface ProductItemProps {
  product: ProductResponseDto;
  canAddToCart: boolean;
  addToCart: (product: ProductResponseDto) => void;
  canManageProduct: boolean;
  editProduct: (product: ProductResponseDto) => void;
  deleteProduct: (product: ProductResponseDto) => void;
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
      <div
        style={{
          position: "relative",
          cursor: canManageProduct ? "pointer" : "default",
        }}
        onClick={handleClick}
      >
        <Card.Img
          variant="top"
          src={product.image ? product.image : "/images/no-image.svg"}
          height="200px"
          style={{
            objectFit: "cover",
          }}
        />
        <Form.Control
          type="file"
          ref={fileInputRef}
          className="d-none"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
      {canManageProduct && (
        <AiFillDelete
          onClick={() => deleteProduct(product)}
          style={{
            filter: "drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.5))",
            display: "inline-block",
            color: "white",
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
            filter: "drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.5))",
            display: "inline-block",
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
        <AiOutlinePlusSquare
          onClick={() => addToCart(product)}
          style={{
            filter: "drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.5))",
            display: "inline-block",
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
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{product.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
        </Card.Title>
        <div>{product.description}</div>
      </Card.Body>
    </Card>
  );
}
