import { alertMap } from "@/features/dashboard/components/StatusAlert/alertMap";
import { PartnerStatus } from "@/features/partners/types/enums";
import { Alert } from "react-bootstrap";

interface StatusAlertProps {
  status: PartnerStatus;
}

export function StatusAlert({ status }: StatusAlertProps) {
  return (
    <Alert variant={alertMap[status].variant}>
      Your current status is: {PartnerStatus[status]}. {alertMap[status].message}
    </Alert>
  );
}
