import { Modal } from "react-bootstrap";
import { ProductRequestDto } from "../interfaces/product";
import { ProductForm } from "./forms/ProductForm";

interface ProductModalProps {
  isVisible: boolean;
  onSubmit: (data: ProductRequestDto) => void;
  handleClose: () => void;
  product: ProductRequestDto | null;
}

export function ProductModal({
  isVisible,
  onSubmit,
  handleClose,
  product,
}: ProductModalProps) {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Update product" : "Add new product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm onSubmit={onSubmit} product={product} />
      </Modal.Body>
    </Modal>
  );
}
