import { Card } from "react-bootstrap";
import { Store } from "../interfaces/store";
import { TbTruckDelivery, TbClockHour4 } from "react-icons/tb";
import { formatCurrency } from "../utils/currencyFormatter";

interface StoreInfoProps {
  store: Store;
}

export function StoreInfo({ store }: StoreInfoProps) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={"https://placehold.co/900x600?text=No+Image"}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.ImgOverlay className="bg-dark opacity-75">
        <Card.Body className="text-light d-flex flex-column justify-content-between h-100 p-0">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5">{store.name}</span>
            <span className="ms-2">{store.categories[0]}</span>
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
    </Card>
  );
}
