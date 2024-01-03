import { UserType } from "@/features/auth/types/enums";
import { AdminDashboard, PartnerDashboard } from "@/features/dashboard/components";
import { useAuthUser } from "@/features/auth/hooks";

export function Dashboard() {
  const { user } = useAuthUser();

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
