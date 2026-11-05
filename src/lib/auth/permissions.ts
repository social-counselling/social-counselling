import type { UserRole } from "@/services/auth/auth.api";

export type Permission = string;

export interface PermissionUser {
  role: UserRole;
  permissions: Permission[];
}

export function hasPermission(
  user: PermissionUser | null | undefined,
  permission: Permission,
): boolean {
  return Boolean(user?.permissions?.includes(permission));
}

export function hasAnyPermission(
  user: PermissionUser | null | undefined,
  permissions: Permission[],
): boolean {
  return permissions.some((permission) => hasPermission(user, permission));
}

export function getDashboardHome(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "COUNSELLOR":
      return "/counsellor";
    case "CLIENT":
      return "/client";
    default:
      return "/login";
  }
}

/**
 * Maps frontend routes to the same page-level keys stored in Permission.
 * Hidden routes (create forms) have their own permission and are checked first.
 */
const pageRoutes: Array<{ path: string; permission: string }> = [
  { path: "/admin/services/new", permission: "admin.services.create" },
  { path: "/admin/counsellors/new", permission: "admin.counsellors.create" },
  { path: "/admin/services", permission: "admin.services" },
  { path: "/admin/counsellors", permission: "admin.counsellors" },
  { path: "/admin/slots", permission: "admin.slots" },
  { path: "/admin/bookings", permission: "admin.bookings" },
  { path: "/admin", permission: "admin.dashboard" },
  { path: "/counsellor/profile", permission: "counsellor.profile" },
  { path: "/counsellor/services", permission: "counsellor.services" },
  { path: "/counsellor/availability", permission: "counsellor.availability" },
  { path: "/counsellor/bookings", permission: "counsellor.bookings" },
  { path: "/counsellor/settings", permission: "counsellor.settings" },
  { path: "/counsellor", permission: "counsellor.dashboard" },
  { path: "/client/bookings", permission: "client.bookings" },
  { path: "/client/profile", permission: "client.profile" },
  { path: "/client", permission: "client.dashboard" },
];

export function getRequiredPermissionsForPath(pathname: string): string[] {
  const match = pageRoutes.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // Unknown routes inside a dashboard are denied until they have a DB page key.
  if (pathname.startsWith("/admin/")) {
    return [match?.permission ?? "__unmapped_page__"];
  }
  if (pathname.startsWith("/counsellor/")) {
    return [match?.permission ?? "__unmapped_page__"];
  }
  if (pathname.startsWith("/client/")) {
    return [match?.permission ?? "__unmapped_page__"];
  }

  return match ? [match.permission] : [];
}
