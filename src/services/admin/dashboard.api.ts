import { getAdminCounsellors } from "./counsellors.api";
import { getAdminServices } from "./services.api";

export interface AdminDashboardStats {
  totalCounsellors: number;
  activeCounsellors: number;
  totalServices: number;
  activeServices: number;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [allCounsellors, activeCounsellors, allServices, activeServices] =
    await Promise.all([
      getAdminCounsellors({
        page: 1,
        limit: 1,
      }),

      getAdminCounsellors({
        page: 1,
        limit: 1,
        status: "ACTIVE",
      }),

      getAdminServices({
        page: 1,
        limit: 1,
      }),

      getAdminServices({
        page: 1,
        limit: 1,
        isActive: true,
      }),
    ]);

  return {
    totalCounsellors: allCounsellors.meta.total,
    activeCounsellors: activeCounsellors.meta.total,
    totalServices: allServices.meta.total,
    activeServices: activeServices.meta.total,
  };
}
