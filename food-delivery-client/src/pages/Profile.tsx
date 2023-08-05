import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ChangePasswordRequestDto, UserBase } from "../interfaces/user";
import { AddressDetails } from "../components/AddressDetails";
import { UserDetails } from "../components/UserDetails";
import { AddressInfo } from "../interfaces/user";
import {
  updateUser,
  reset,
  uploadImage,
  removeImage,
  changePassword,
} from "../features/auth/authSlice";
import { useEffect, useRef } from "react";
import { UserType, StateStatus } from "../interfaces/enums";
import { toast } from "react-toastify";
import { UserAvatar } from "../components/UserAvatar";
import { ChangePassword } from "../components/ChangePassword";

export function Profile() {
  const { user, status, message } = useAppSelector((state) => state.auth);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === StateStatus.Error && message) {
      toast.error(message);
    }

    if (status === StateStatus.Success && message) {
      toast.success(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [status, message]);

  const handleUpdateDetails = (data: UserBase) => {
    if (!user) {
      return;
    }

    const updatedUser = {
      userId: user.id,
      userType: user.userType,
      userData: { ...user, ...data },
    };

    dispatch(updateUser(updatedUser));
  };

  const handleUpdateAddress = (data: AddressInfo) => {
    if (!user) {
      return;
    }

    const updatedUser = {
      userId: user.id,
      userType: user.userType,
      userData: { ...user, ...data },
    };

    dispatch(updateUser(updatedUser));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.item(0);
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(uploadImage(formData));
    }
  };

  const handleImageRemove = () => {
    if (user && user.imageData) {
      dispatch(removeImage());
    }
  };

  const handlePasswordChange = (data: ChangePasswordRequestDto) => {
    dispatch(changePassword(data));
  };

  return (
    user && (
      <Row className="d-flex justify-content-center">
        <Col xs={10} sm={12} md={10} lg={7} xl={6}>
          <h1 className="text-center mt-3 mb-4">Your Profile</h1>
          <div className="w-50 mx-auto">
            <UserAvatar image={user.imageData} userType={user.userType} />
            <div className="w-100 d-flex justify-content-around mt-3 gap-3">
              <Button
                variant="primary"
                className="w-50"
                onClick={handleImageClick}
              >
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleImageChange}
                  accept=".jpg, .jpeg, .png"
                />
                Upload
              </Button>
              <Button
                variant="secondary"
                className="w-50"
                onClick={handleImageRemove}
              >
                Remove
              </Button>
            </div>
          </div>

          <hr />

          <div className="mt-3">
            <h1 className="text-center mt-3 mb-4">User Details</h1>
            <UserDetails
              data={user as UserBase}
              onSubmit={(data) => handleUpdateDetails(data)}
            />
          </div>

          {user?.userType == UserType.Customer && (
            <>
              <hr />
              <div className="mt-3">
                <h1 className="text-center mt-3 mb-4">Address Info</h1>
                <AddressDetails
                  data={user as AddressInfo}
                  onSubmit={(data) => handleUpdateAddress(data)}
                />
              </div>
            </>
          )}

          <hr />

          <div className="mt-3">
            <h1 className="text-center mt-3 mb-4">Change Password</h1>
            <ChangePassword onSubmit={(data) => handlePasswordChange(data)} />
          </div>
        </Col>
      </Row>
    )
  );
}
