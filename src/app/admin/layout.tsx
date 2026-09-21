import type { Metadata } from "next";

import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Panel | Social Counselling",
  description:
    "Social Counselling administration panel",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}