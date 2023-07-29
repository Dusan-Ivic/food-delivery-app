import { Card } from "react-bootstrap";
import { Store } from "../interfaces/store";

interface StoreItemProps {
  store: Store;
}

export function StoreItem({ store }: StoreItemProps) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={"https://placehold.co/900x600?text=No+Image"}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{store.name}</span>
          <span className="ms-2 text-muted">{store.categories[0]}</span>
        </Card.Title>
        <div>{store.description}</div>
      </Card.Body>
    </Card>
  );
}
