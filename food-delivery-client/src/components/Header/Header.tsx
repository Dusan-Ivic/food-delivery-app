import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserType } from "@/features/auth/types/enums";
import { useAuthUser } from "@/features/auth/hooks";

export function Header() {
  const { user, logout } = useAuthUser();

  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Navbar.Brand to="/" as={NavLink}>
          FoodDeliverNow
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/stores" as={NavLink}>
            Stores
          </Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <>
              {[UserType.Partner, UserType.Admin].includes(user?.userType) && (
                <Nav.Link to="/dashboard" as={NavLink}>
                  Dashboard
                </Nav.Link>
              )}

              {user?.userType === UserType.Customer && (
                <Nav.Link to="/orders" as={NavLink}>
                  Your Orders
                </Nav.Link>
              )}

              <Nav.Link to="/profile" as={NavLink}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
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
