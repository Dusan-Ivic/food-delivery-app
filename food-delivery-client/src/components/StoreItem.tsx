import { Card } from "react-bootstrap";
import { StoreState } from "../interfaces/store";
import { getFullImageUrl } from "../utils/imageUrlGenerator";

interface StoreItemProps {
  store: StoreState;
}

export function StoreItem({ store }: StoreItemProps) {
  return (
    <Card className="h-100">
      <div
        style={{
          position: "relative",
        }}
      >
        <Card.Img
          variant="top"
          src={
            store?.image
              ? getFullImageUrl(store?.image)
              : "/images/no-image.svg"
          }
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
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{store.name}</span>
          <span className="ms-2 text-muted">{store.category}</span>
        </Card.Title>
        <div>{store.description}</div>
      </Card.Body>
    </Card>
  );
}
