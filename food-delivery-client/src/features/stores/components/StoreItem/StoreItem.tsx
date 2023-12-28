import { Card } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { StoreResponseDto } from "@/features/stores/types/response";

interface StoreItemProps {
  store: StoreResponseDto;
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
          src={store?.image ? store.image : "/images/no-image.svg"}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <div
          className="d-flex align-items-center gap-1 text-white"
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            filter: "drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.6))",
          }}
        >
          <FaLocationDot /> <span>{store.city}</span>
        </div>
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
