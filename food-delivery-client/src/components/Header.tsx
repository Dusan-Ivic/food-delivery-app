import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Navbar.Brand to="/" as={NavLink}>
          FoodDelivery
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
