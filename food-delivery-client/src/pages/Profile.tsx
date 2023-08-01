import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  UpdateUserData,
  User,
  UserRequestDto,
  UserType,
  Customer,
} from "../interfaces/user";
import { AddressDetails } from "../components/AddressDetails";
import { UserDetails } from "../components/UserDetails";
import { AddressInfo } from "../interfaces/customer";
import { updateUser, reset, uploadImage } from "../features/auth/authSlice";
import { useEffect, useRef } from "react";
import { StateStatus } from "../interfaces/state";
import { toast } from "react-toastify";
import { UserAvatar } from "../components/UserAvatar";

export function Profile() {
  const { user, status, message } = useAppSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

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

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.item(0);
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadImage(formData));
    }
  };

  const handleRemove = () => {};

  return (
    user && (
      <Row className="d-flex justify-content-center">
        <Col xs={10} sm={12} md={10} lg={7} xl={6}>
          <h1 className="text-center mt-3 mb-4">Your Profile</h1>
          <div className="w-50 mx-auto">
            <UserAvatar image={user.image} userType={user.userType} />
            <div className="w-100 d-flex justify-content-around mt-3 gap-3">
              <Button variant="primary" className="w-50" onClick={handleClick}>
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleChange}
                  accept=".jpg, .jpeg, .png"
                />
                Upload
              </Button>
              <Button
                variant="secondary"
                className="w-50"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
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
    )
  );
}
