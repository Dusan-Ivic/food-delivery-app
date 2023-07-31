import { Modal } from "react-bootstrap";
import { ProductFormData } from "../interfaces/product";
import { ProductForm } from "./forms/ProductForm";

interface ProductModalProps {
  isVisible: boolean;
  onSubmit: (data: ProductFormData) => void;
  handleClose: () => void;
}

export function ProductModal({
  isVisible,
  onSubmit,
  handleClose,
}: ProductModalProps) {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}
