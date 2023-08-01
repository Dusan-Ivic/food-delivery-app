import { useAppSelector } from "../../app/hooks";
import { UserType } from "../../interfaces/enums";
import { PartnerDashboard } from "../PartnerDashboard";

export function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  const DashboardComponent = () => {
    switch (user?.userType) {
      case UserType.Partner:
        return <PartnerDashboard />;
      default:
        return null;
    }
  };

  return <DashboardComponent />;
}
