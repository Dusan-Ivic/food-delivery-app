import { ComponentType } from "react";
import { Modal } from "react-bootstrap";

export interface FormProps<T> {
  data: T | null;
  onSubmit: (data: T) => void;
}

export interface FormModalProps<T> {
  isVisible: boolean;
  title: string;
  FormComponent: ComponentType<FormProps<T>>;
  data: T | null;
  onSubmit: (data: T) => void;
  onClose: () => void;
}

export function FormModal<T extends object>({
  isVisible,
  title,
  FormComponent,
  data,
  onSubmit,
  onClose,
}: FormModalProps<T>) {
  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormComponent data={data} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}
