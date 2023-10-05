import { ComponentType } from "react";
import { Modal } from "react-bootstrap";

export interface FormModalProps<T> {
  isVisible: boolean;
  title: string;
  FormComponent: ComponentType<FormProps<T>>;
  data: T | undefined;
  onSubmit: (data: T) => void;
  onClose: () => void;
}

export interface FormProps<T> {
  data: T | undefined;
  onSubmit: (data: T) => void;
}

export function FormModal<T extends object>({
  isVisible,
  title,
  FormComponent,
  data,
  onSubmit,
  onClose,
}: FormModalProps<T>) {
  const handleOwnSubmit = (data: T) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormComponent data={data} onSubmit={handleOwnSubmit} />
      </Modal.Body>
    </Modal>
  );
}
