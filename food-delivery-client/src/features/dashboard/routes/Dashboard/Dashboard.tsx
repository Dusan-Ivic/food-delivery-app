import { UserType } from "@/features/auth/types/enums";
import { useAppSelector } from "@/app/hooks";
import { AdminDashboard, PartnerDashboard } from "@/features/dashboard/components";

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
