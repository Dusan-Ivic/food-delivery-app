import { Row, Col } from "react-bootstrap";
import { StoreState } from "../interfaces/store";
import { StoreItem } from "./StoreItem";
import { Link } from "react-router-dom";

interface StoreListProps {
  stores: StoreState[];
}

export function StoreList({ stores }: StoreListProps) {
  return (
    <Row xs={1} md={2} lg={2} xl={4} className="g-3 justify-content-center">
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
