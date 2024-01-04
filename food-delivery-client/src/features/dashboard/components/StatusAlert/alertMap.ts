import { PartnerStatus } from "@/features/partners/types/enums";

export const alertMap = {
  [PartnerStatus.Pending]: {
    variant: "warning",
    message: "You may be restricted from performing certain actions.",
  },
  [PartnerStatus.Rejected]: {
    variant: "danger",
    message: "You may be restricted from performing certain actions.",
  },
  [PartnerStatus.Suspended]: {
    variant: "danger",
    message: "You may be restricted from performing certain actions.",
  },
  [PartnerStatus.Accepted]: {
    variant: "success",
    message: "You can now perform all store and product related actions.",
  },
};
