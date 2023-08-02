import { Modal } from "react-bootstrap";
import { StoreForm } from "./forms";
import { StoreRequestDto } from "../interfaces/store";

interface StoreModalProps {
  isVisible: boolean;
  onSubmit: (data: StoreRequestDto) => void;
  handleClose: () => void;
  store: StoreRequestDto | null;
}

export function StoreModal({
  isVisible,
  onSubmit,
  handleClose,
  store,
}: StoreModalProps) {
  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{store ? "Update store" : "Add new store"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StoreForm onSubmit={onSubmit} store={store} />
      </Modal.Body>
    </Modal>
  );
}
