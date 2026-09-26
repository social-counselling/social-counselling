"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Brand */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-lg font-semibold text-gray-900">
          Social Counselling
        </h1>

        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
          Counsellor Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
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

      {/* Bottom */}
      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
