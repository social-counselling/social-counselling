
"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({
  children,
}: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8f5]">
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onOpen={() => setIsSidebarOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:pl-[260px]">
        <main className="min-h-screen pt-[70px] lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
