import {
  BarChart3,
  CalendarDays,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  UserRoundCheck,
  CreditCard,
} from "lucide-react";

export interface AdminNavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: FileText,
  },
  {
    label: "Counsellors",
    href: "/admin/counsellors",
    icon: UserRoundCheck,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];