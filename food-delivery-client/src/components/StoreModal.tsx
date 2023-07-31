import { Modal } from "react-bootstrap";
import { StoreForm } from "./forms";
import { CreateStoreRequestDto as StoreFormData } from "../interfaces/store";

interface StoreModalProps {
  isVisible: boolean;
  onSubmit: (data: StoreFormData) => void;
  handleClose: () => void;
}

export function StoreModal({
  isVisible,
  onSubmit,
  handleClose,
}: StoreModalProps) {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new store</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StoreForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}
