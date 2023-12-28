import { UserType } from "@/features/auth/types/enums";
import { Card } from "react-bootstrap";

interface UserAvatarProps {
  image: string | null;
  userType: UserType;
}

export function UserAvatar({ image, userType }: UserAvatarProps) {
  const mapUserTypeToColor = {
    [UserType.Customer]: "bg-success",
    [UserType.Partner]: "bg-warning",
    [UserType.Admin]: "bg-danger",
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={image ? image : "/images/blank-profile-image.png"}
        width="150px"
        style={{ objectFit: "cover" }}
      />
      <div
        className={`rounded ${
          mapUserTypeToColor[userType!]
        } px-2 py-1 d-flex justify-content-center align-items-center`}
        style={{
          color: "white",
          position: "absolute",
          top: 0,
          right: 0,
          transform: "translate(25%, -25%)",
        }}
      >
        {UserType[userType!]}
      </div>
    </Card>
  );
}
