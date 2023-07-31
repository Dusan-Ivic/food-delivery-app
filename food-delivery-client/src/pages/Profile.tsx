import { Col, Row, Card } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  UpdateUserData,
  User,
  UserRequestDto,
  UserType,
} from "../interfaces/user";
import { Customer } from "../interfaces/user";
import { AddressDetails } from "../components/AddressDetails";
import { UserDetails } from "../components/UserDetails";
import { AddressInfo } from "../interfaces/customer";
import { updateUser, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import { StateStatus } from "../interfaces/state";
import { toast } from "react-toastify";

export function Profile() {
  const { user, status, message } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const mapUserTypeToColor = {
    [UserType.Customer]: "bg-success",
    [UserType.Partner]: "bg-warning",
    [UserType.Admin]: "bg-danger",
  };

  const handleUpdateDetails = (data: UserRequestDto) => {
    const updateData: UpdateUserData = {
      data: {
        ...user!,
        ...data,
      },
      userId: user!.id,
      userType: user!.userType,
    };

    dispatch(updateUser(updateData));
  };

  const handleUpdateAddress = (data: AddressInfo) => {
    const updateData: UpdateUserData = {
      data: {
        ...user!,
        ...data,
      },
      userId: user!.id,
      userType: user!.userType,
    };

    dispatch(updateUser(updateData));
  };

  useEffect(() => {
    if (status === StateStatus.Error) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

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

        <hr />

        <div className="mt-3">
          <h1 className="text-center mt-3 mb-4">User Details</h1>
          <UserDetails
            user={user as User}
            onSubmit={(data) => handleUpdateDetails(data)}
          />
        </div>

        <hr />

        {user?.userType == UserType.Customer && (
          <div className="mt-3">
            <h1 className="text-center mt-3 mb-4">Address Info</h1>
            <AddressDetails
              user={user as Customer}
              onSubmit={(data) => handleUpdateAddress(data)}
            />
          </div>
        )}
      </Col>
    </Row>
  );
}
