import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { UserType } from "../interfaces/user";
import { Customer } from "../interfaces/user";
import { AddressDetails } from "../components/AddressDetails";

export function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const mapUserTypeToColor = {
    [UserType.Customer]: "bg-success",
    [UserType.Partner]: "bg-warning",
    [UserType.Admin]: "bg-danger",
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={10} sm={12} md={10} lg={7} xl={6}>
        <h1 className="text-center mt-3 mb-4">Your Profile</h1>
        <div className="w-50 mx-auto">
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src="images/blank-profile-image.png"
              width="150px"
              style={{ objectFit: "cover" }}
            />
            <div
              className={`rounded ${
                mapUserTypeToColor[user?.userType!]
              } px-2 py-1 d-flex justify-content-center align-items-center`}
              style={{
                color: "white",
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(25%, -25%)",
              }}
            >
              {UserType[user?.userType!]}
            </div>
          </Card>
        </div>
        <Form onSubmit={onSubmit}>
          <Row xs={1} sm={1} md={2}>
            <Col>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example"
                  value={user?.username}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  value={user?.email}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row xs={1} sm={1} md={2}>
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  value={user?.firstName}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  value={user?.lastName}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          {user?.userType == UserType.Customer && (
            <AddressDetails user={user as Customer} />
          )}

          <Button variant="primary" type="submit" className="w-100">
            Save Profile
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
