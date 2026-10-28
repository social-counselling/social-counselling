import SharedDashboardShell from "@/components/dashboard/SharedDashboardShell";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SharedDashboardShell allowedRoles={["CLIENT"]}>{children}</SharedDashboardShell>;
}
