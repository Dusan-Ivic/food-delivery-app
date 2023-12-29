import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps {
  isVisible: boolean;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isVisible,
  content,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal show={isVisible} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No, go back!
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes, proceed!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
