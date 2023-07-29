import { Row, Col } from "react-bootstrap";
import { Store } from "../interfaces/store";
import { StoreItem } from "./StoreItem";

interface StoreListProps {
  stores: Store[];
}

export function StoreList({ stores }: StoreListProps) {
  return (
    <Row md={2} xs={1} lg={2} xl={3} className="g-3">
      {stores.map((store) => (
        <Col key={store.id}>
          <StoreItem store={store} />
        </Col>
      ))}
    </Row>
  );
}