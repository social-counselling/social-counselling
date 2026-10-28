import SharedDashboardShell from "@/components/dashboard/SharedDashboardShell";

export default function CounsellorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SharedDashboardShell allowedRoles={["COUNSELLOR"]}>{children}</SharedDashboardShell>;
}
