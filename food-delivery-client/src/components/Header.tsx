import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link to="/register" as={NavLink}>
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
