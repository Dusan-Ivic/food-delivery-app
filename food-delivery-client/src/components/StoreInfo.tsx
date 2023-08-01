import { Card, Form } from "react-bootstrap";
import { StoreState } from "../interfaces/store";
import { TbTruckDelivery, TbClockHour4 } from "react-icons/tb";
import { formatCurrency } from "../utils/currencyFormatter";
import { useRef } from "react";

interface StoreInfoProps {
  store: StoreState;
  canManageStore: boolean;
  onImageChange: (imageFile: File | null) => void;
}

export function StoreInfo({
  store,
  canManageStore,
  onImageChange,
}: StoreInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current && canManageStore) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.item(0);
    if (imageFile) {
      onImageChange(imageFile);
    }
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={store?.imageData || "/images/no-image.svg"}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.ImgOverlay
        onClick={handleClick}
        className="bg-dark opacity-75"
        style={{ cursor: canManageStore ? "pointer" : "default" }}
      >
        <Card.Body className="text-light d-flex flex-column justify-content-between h-100 p-0">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5">{store.name}</span>
            <span className="ms-2">{store.category}</span>
          </Card.Title>
          <div>{store.description}</div>
          <div className="d-flex align-items-center column-gap-3 text-warning">
            <div className="d-flex align-items-center column-gap-1">
              <TbClockHour4 />
              {store.deliveryOptions.deliveryTimeInMinutes}'
            </div>
            <div className="d-flex align-items-center column-gap-1">
              <TbTruckDelivery />
              <div>{formatCurrency(store.deliveryOptions.deliveryFee)}</div>
            </div>
          </div>
        </Card.Body>
      </Card.ImgOverlay>
      <Form.Control
        type="file"
        ref={fileInputRef}
        className="d-none"
        onChange={handleChange}
        accept=".jpg, .jpeg, .png"
      />
    </Card>
  );
}
