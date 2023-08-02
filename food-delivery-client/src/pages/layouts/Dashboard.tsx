import { useAppSelector } from "../../app/hooks";
import { UserType } from "../../interfaces/enums";
import { AdminDashboard } from "../AdminDashboard";
import { PartnerDashboard } from "../PartnerDashboard";

export function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  const DashboardComponent = () => {
    switch (user?.userType) {
      case UserType.Partner:
        return <PartnerDashboard />;
      case UserType.Admin:
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  return <DashboardComponent />;
}
