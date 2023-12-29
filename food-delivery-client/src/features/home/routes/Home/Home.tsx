import { Container, Row, Col } from "react-bootstrap";
import {
  IoCartOutline,
  IoStorefrontOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Container>
      <Row xs={1} sm={1} md={1} lg={2}>
        <Col className="d-flex justify-content-center">
          <img src="/images/food-delivery.png" className="w-100" />
        </Col>
        <Col className="d-md-flex flex-column justify-content-center">
          <h1 className="text-center mt-3 mb-4 fs-3 display-1">
            Satisfy Your Cravings with FoodDeliverNow
          </h1>
          <p className="text-center text-muted lead">
            Discover a world of delectable flavors and effortless dining.
            FoodDeliverNow brings the finest local cuisines right to your
            doorstep. Browse, choose, and indulge - all with a simple tap.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/stores" className="btn btn-outline-primary">
              Explore stores
            </Link>
          </div>
        </Col>
      </Row>

      <hr />

      <Row>
        <h1 className="text-center mt-3 mb-5 display-4">How it works</h1>
        <Row xs={1} sm={1} md={3} className="text-center gap-4 gap-md-0">
          <Col>
            <IoStorefrontOutline style={{ fontSize: "5rem" }} />
            <h5 className="mt-3">Explore Our Stores</h5>
          </Col>
          <Col>
            <IoCartOutline style={{ fontSize: "5rem" }} />
            <h5 className="mt-3">Build Your Cart</h5>
          </Col>
          <Col>
            <IoBagCheckOutline style={{ fontSize: "5rem" }} />
            <h5 className="mt-3">Place Your Order</h5>
          </Col>
        </Row>
      </Row>

      <hr />
    </Container>
  );
}
