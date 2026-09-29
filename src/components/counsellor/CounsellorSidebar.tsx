"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  UserRound,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import { logout } from "@/services/auth/auth.api";
import { clearAccessToken } from "@/lib/auth/auth-storage";

const navigation = [
  {
    label: "Dashboard",
    href: "/counsellor",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/counsellor/profile",
    icon: UserRound,
  },
  {
    label: "My Services",
    href: "/counsellor/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Availability",
    href: "/counsellor/availability",
    icon: Clock3,
  },
  {
    label: "Bookings",
    href: "/counsellor/bookings",
    icon: CalendarDays,
  },
  {
    label: "My Clients",
    href: "/counsellor/clients",
    icon: Users,
  },
  {
    label: "Reviews",
    href: "/counsellor/reviews",
    icon: Star,
  },
  {
    label: "Settings",
    href: "/counsellor/settings",
    icon: Settings,
  },
];

export default function CounsellorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Even if the backend logout request fails,
      // clear the local access token and continue logout.
    } finally {
      clearAccessToken();
      router.replace("/login");
    }
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Brand */}
      <div className="shrink-0 border-b border-gray-200 px-6 py-5">
        <Link
          href="/"
          className="block rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-gray-900"
        >
          <h1 className="text-lg font-semibold text-gray-900">
            Social Counselling
          </h1>

          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
            Counsellor Panel
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/counsellor"
                ? pathname === "/counsellor"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4 shrink-0" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
