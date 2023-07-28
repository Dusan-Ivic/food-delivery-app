import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export function Header() {
  const { user } = useAppSelector((state) => state.auth);

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
          {user ? (
            <>
              <Nav.Link>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link>Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
