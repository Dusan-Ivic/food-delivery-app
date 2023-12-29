import { Card, Form } from "react-bootstrap";
import { TbTruckDelivery, TbClockHour4 } from "react-icons/tb";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { formatCurrency } from "@/utils";
import { StoreResponseDto } from "@/features/stores/types/response";

interface StoreInfoProps {
  store: StoreResponseDto;
  canManageStore: boolean;
  onImageChange: (imageFile: File | null) => void;
}

export function StoreInfo({ store, canManageStore, onImageChange }: StoreInfoProps) {
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
      <div
        style={{
          position: "relative",
        }}
      >
        <Card.Img
          variant="top"
          src={store?.image ? store.image : "/images/no-image.svg"}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />
      </div>

      <Card.ImgOverlay
        onClick={handleClick}
        style={{
          cursor: canManageStore ? "pointer" : "default",
          filter: "drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.7))",
          display: "inline-block",
        }}
      >
        <Card.Body className="text-light d-flex flex-column justify-content-between h-100 p-0">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5">{store.name}</span>
            <span className="ms-2">{store.category}</span>
          </Card.Title>
          <div>{store.description}</div>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center column-gap-3 text-warning">
              <div className="d-flex align-items-center column-gap-1">
                <TbClockHour4 />
                {store.deliveryTimeInMinutes}'
              </div>
              <div className="d-flex align-items-center column-gap-1">
                <TbTruckDelivery />
                <div>{formatCurrency(store.deliveryFee)}</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaLocationDot /> <span>{store.city}</span>
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
