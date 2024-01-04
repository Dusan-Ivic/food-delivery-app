import { Button, Col, Form, Row } from "react-bootstrap";
import { UserDetails, UserAvatar, ChangePassword } from "@/features/auth/components";
import { useRef } from "react";
import { UserRequestDto } from "@/features/auth/types/request";
import { useAuthUser } from "@/features/auth/hooks";

export function Profile() {
  const { user, updateProfile, changePassword, uploadImage, deleteImage } = useAuthUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      uploadImage(formData);
    }
  };

  return (
    user && (
      <Row className="d-flex justify-content-center">
        <Col xs={10} sm={12} md={10} lg={7} xl={6}>
          <h1 className="text-center mt-3 mb-4">Your Profile</h1>
          <div className="w-50 mx-auto">
            <UserAvatar image={user.image} userType={user.userType} />
            <div className="w-100 d-flex justify-content-around mt-3 gap-3">
              <Button variant="primary" className="w-50" onClick={handleImageClick}>
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleImageChange}
                  accept=".jpg, .jpeg, .png"
                />
                Upload
              </Button>
              <Button variant="secondary" className="w-50" onClick={deleteImage}>
                Remove
              </Button>
            </div>
          </div>

          <hr />

          <div className="mt-3">
            <h1 className="text-center mt-3 mb-4">User Details</h1>
            <UserDetails data={user as UserRequestDto} onSubmit={updateProfile} />
          </div>

          <hr />

          <div className="mt-3">
            <h1 className="text-center mt-3 mb-4">Change Password</h1>
            <ChangePassword onSubmit={changePassword} />
          </div>
        </Col>
      </Row>
    )
  );
}
