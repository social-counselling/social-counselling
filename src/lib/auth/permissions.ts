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

/** Route-level UI checks complement (but never replace) backend authorization. */
export function getRequiredPermissionsForPath(pathname: string): string[] {
  if (pathname === "/admin" || pathname === "/counsellor" || pathname === "/client") {
    return ["dashboard.view"];
  }

  if (pathname.startsWith("/admin/services/new")) return ["services.manage"];
  if (pathname.startsWith("/admin/services")) return ["services.view"];
  if (pathname.startsWith("/admin/counsellors/new")) return ["counsellors.manage"];
  if (pathname.startsWith("/admin/counsellors")) return ["counsellors.view"];
  if (pathname.startsWith("/admin/slots")) return ["slots.view"];
  if (pathname.startsWith("/admin/bookings")) return ["bookings.view_all"];

  if (pathname.startsWith("/counsellor/profile")) return ["counsellor.profile.view_own"];
  if (pathname.startsWith("/counsellor/services")) return ["services.view"];
  if (pathname.startsWith("/counsellor/availability")) return ["availability.view_own"];
  if (pathname.startsWith("/counsellor/bookings")) return ["bookings.view_own"];
  if (pathname.startsWith("/counsellor/settings")) return ["account.password.change"];

  if (pathname.startsWith("/client/bookings")) return ["bookings.view_own"];
  if (pathname.startsWith("/client/profile")) return ["dashboard.view"];

  return [];
}
