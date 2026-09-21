"use client";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({
  children,
}: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8f5]">

      {/* Sidebar */}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      {/* Main Area */}

      <div className="min-h-screen lg:pl-[260px]">

        <AdminHeader
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
        />

        {/* Page Content */}

        <main className="min-h-[calc(100vh-76px)]">
          {children}
        </main>

      </div>

    </div>
  );
}