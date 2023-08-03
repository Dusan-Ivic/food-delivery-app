import { Table } from "react-bootstrap";
import { PartnerState } from "../interfaces/partner";
import { PartnerStatus } from "../interfaces/enums";
import { LuShieldCheck, LuShieldClose, LuShieldQuestion } from "react-icons/lu";
import { HiOutlineX, HiOutlineCheck } from "react-icons/hi";

interface PartnerTableProps {
  partners: PartnerState[];
  onVerify: (partner: PartnerState, status: PartnerStatus) => void;
}

export function PartnerTable({ partners, onVerify }: PartnerTableProps) {
  const statusToIconMap = {
    [PartnerStatus.Pending]: (
      <LuShieldQuestion className="fs-4" style={{ color: "orange" }} />
    ),
    [PartnerStatus.Rejected]: (
      <LuShieldClose className="fs-4" style={{ color: "red" }} />
    ),
    [PartnerStatus.Suspended]: (
      <LuShieldClose className="fs-4" style={{ color: "red" }} />
    ),
    [PartnerStatus.Accepted]: (
      <LuShieldCheck className="fs-4" style={{ color: "green" }} />
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
                    <HiOutlineCheck
                      className="fs-4"
                      style={{ color: "darkblue" }}
                      onClick={() => onVerify(partner, PartnerStatus.Accepted)}
                    />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <HiOutlineX
                      className="fs-4"
                      style={{ color: "darkred" }}
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
