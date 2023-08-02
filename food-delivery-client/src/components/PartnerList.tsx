import { Table } from "react-bootstrap";
import { PartnerState } from "../interfaces/partner";
import { PartnerStatus } from "../interfaces/enums";
import { LuVerified } from "react-icons/lu";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";

interface PartnerListProps {
  partners: PartnerState[];
  onVerify: (partner: PartnerState, status: PartnerStatus) => void;
}

export function PartnerList({ partners, onVerify }: PartnerListProps) {
  const statusToIconMap = {
    [PartnerStatus.Pending]: (
      <AiOutlineLoading3Quarters className="fs-5" style={{ color: "orange" }} />
    ),
    [PartnerStatus.Rejected]: (
      <HiOutlineX className="fs-5" style={{ color: "red" }} />
    ),
    [PartnerStatus.Suspended]: (
      <HiOutlineX className="fs-5" style={{ color: "red" }} />
    ),
    [PartnerStatus.Accepted]: (
      <LuVerified className="fs-4" style={{ color: "green" }} />
    ),
  };

  return (
    <>
      <Table
        striped
        hover
        className="text-center rounded rounded-3 overflow-hidden"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Status</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {partners.map((partner) => (
            <tr key={partner.id}>
              <td>{partner.id}</td>
              <td>
                <img
                  style={{ height: "48px", width: "48px", objectFit: "cover" }}
                  src={partner.imageData || "/images/blank-profile-image.png"}
                />
              </td>
              <td>{partner.username}</td>
              <td>{partner.firstName}</td>
              <td>{partner.lastName}</td>
              <td>
                <div style={{ cursor: "pointer" }}>
                  {statusToIconMap[partner.status]}
                </div>
              </td>
              <td>
                <div className="d-md-flex justify-content-center">
                  <div style={{ cursor: "pointer" }}>
                    <AiOutlineCheckCircle
                      className="fs-4"
                      onClick={() => onVerify(partner, PartnerStatus.Accepted)}
                    />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <AiOutlineCloseCircle
                      className="fs-4"
                      onClick={() => onVerify(partner, PartnerStatus.Rejected)}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
