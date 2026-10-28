import type { Metadata } from "next";
import SharedDashboardShell from "@/components/dashboard/SharedDashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | Social Counselling",
  description: "Social Counselling dashboard",
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SharedDashboardShell allowedRoles={["ADMIN"]}>{children}</SharedDashboardShell>;
}
