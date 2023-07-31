import { Row, Col } from "react-bootstrap";
import { Store } from "../interfaces/store";
import { StoreItem } from "./StoreItem";
import { Link } from "react-router-dom";

interface StoreListProps {
  stores: Store[];
}

export function StoreList({ stores }: StoreListProps) {
  return (
    <Row md={2} xs={1} lg={2} xl={3} className="g-3 justify-content-center">
      {stores.map((store) => (
        <Col key={store.id}>
          <Link to={`/stores/${store.id}`} style={{ textDecoration: "none" }}>
            <StoreItem store={store} />
          </Link>
        </Col>
      ))}
    </Row>
  );
}
