"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

import { clearAccessToken } from "@/lib/auth/auth-storage";
import { getDashboardHome, getRequiredPermissionsForPath, hasAnyPermission } from "@/lib/auth/permissions";
import { resolveImageUrl } from "@/lib/image-url";
import { getCurrentUser, logout, type CurrentUser, type UserRole } from "@/services/auth/auth.api";

type DashboardContextValue = { user: CurrentUser };
const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboardAuth() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboardAuth must be used inside SharedDashboardShell");
  return value;
}

type NavigationItem = {
  label: string;
  href: string;
  icon: ElementType;
  permissions: string[];
};

const roleNavigation: Record<UserRole, NavigationItem[]> = {
  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, permissions: ["dashboard.view"] },
    { label: "Services", href: "/admin/services", icon: FileText, permissions: ["services.view"] },
    { label: "Counsellors", href: "/admin/counsellors", icon: UserRoundCheck, permissions: ["counsellors.view"] },
    { label: "Slots & Availability", href: "/admin/slots", icon: Clock3, permissions: ["slots.view"] },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarDays, permissions: ["bookings.view_all"] },
  ],
  COUNSELLOR: [
    { label: "Dashboard", href: "/counsellor", icon: LayoutDashboard, permissions: ["dashboard.view"] },
    { label: "My Profile", href: "/counsellor/profile", icon: UserRound, permissions: ["counsellor.profile.view_own"] },
    { label: "My Services", href: "/counsellor/services", icon: BriefcaseBusiness, permissions: ["services.view"] },
    { label: "Availability", href: "/counsellor/availability", icon: Clock3, permissions: ["availability.view_own"] },
    { label: "Bookings", href: "/counsellor/bookings", icon: CalendarDays, permissions: ["bookings.view_own"] },
    { label: "Settings", href: "/counsellor/settings", icon: Settings, permissions: ["account.password.change"] },
  ],
  CLIENT: [
    { label: "Dashboard", href: "/client", icon: LayoutDashboard, permissions: ["dashboard.view"] },
    { label: "My Bookings", href: "/client/bookings", icon: CalendarDays, permissions: ["bookings.view_own"] },
    { label: "My Profile", href: "/client/profile", icon: UserRound, permissions: ["dashboard.view"] },
  ],
};

const roleLabel: Record<UserRole, string> = {
  ADMIN: "Administrator",
  COUNSELLOR: "Counsellor",
  CLIENT: "Client",
};

function getName(user: CurrentUser) {
  return `${user.firstName} ${user.lastName ?? ""}`.trim() || user.email;
}

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U";
}

function ProfileAvatar({ user, size = 44 }: { user: CurrentUser; size?: number }) {
  const name = getName(user);
  const imageUrl = resolveImageUrl(user.profileImageUrl);
  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size <= 32 ? 10 : 13 }}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill sizes={`${size}px`} className="object-cover" unoptimized />
      ) : getInitials(name)}
    </span>
  );
}

function AccessDenied() {
  return (
    <div className="m-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 sm:m-8">
      <h1 className="text-base font-semibold">You don’t have access to this section</h1>
      <p className="mt-1">Your account permissions do not allow this page. If you think this is incorrect, contact your administrator.</p>
    </div>
  );
}

export default function SharedDashboardShell({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: UserRole[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    getCurrentUser()
      .then((response) => {
        if (mounted) setUser(response.user);
      })
      .catch(() => {
        if (mounted) {
          clearAccessToken();
          setAuthError("Your session has expired. Please sign in again.");
          router.replace("/login");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!user) return;
    if (!allowedRoles.includes(user.role)) {
      router.replace(getDashboardHome(user.role));
    }
  }, [allowedRoles, router, user]);

  const navigation = useMemo(() => {
    if (!user) return [];
    return roleNavigation[user.role].filter((item) => hasAnyPermission(user, item.permissions));
  }, [user]);

  const requiredPermissions = getRequiredPermissionsForPath(pathname);
  const canViewPath = !user || requiredPermissions.length === 0 || hasAnyPermission(user, requiredPermissions);

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Clear the local session even if the logout request fails.
    } finally {
      clearAccessToken();
      router.replace("/login");
    }
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8f5] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#103f3d]/20 border-t-[#103f3d]" />
          <p className="mt-4 text-sm text-slate-600">{authError || "Loading your dashboard…"}</p>
        </div>
      </main>
    );
  }

  if (!allowedRoles.includes(user.role)) return null;

  const fullName = getName(user);
  const home = getDashboardHome(user.role);

  return (
    <DashboardContext.Provider value={{ user }}>
      <div className="min-h-screen bg-[#f5f8f5]">
        <div className="fixed inset-x-0 top-0 z-40 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
          <Link href="/" aria-label="Social Counselling home" className="relative h-12 w-32 shrink-0">
            <Image src="/images/logo/logo2.png" alt="Social Counselling" fill priority sizes="128px" className="object-contain object-left" />
          </Link>
          <button type="button" onClick={() => setIsOpen(true)} aria-label="Open dashboard menu" className="flex min-w-0 items-center gap-2 rounded-full border border-slate-200 p-1.5 pr-3 hover:bg-slate-50">
            <ProfileAvatar user={user} size={30} />
            <span className="max-w-32 truncate text-xs font-semibold text-[#103f3d]">{fullName}</span>
          </button>
        </div>

        {isOpen && <button type="button" aria-label="Close dashboard menu overlay" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />}

        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#103f3d] text-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="relative flex h-[96px] shrink-0 items-center justify-center border-b border-white/10 px-5">
            <Link href="/" onClick={() => setIsOpen(false)} className="relative h-[68px] w-[150px]">
              <Image src="/images/logo/logo2.png" alt="Social Counselling" fill priority sizes="150px" className="object-contain brightness-0 invert" />
            </Link>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close dashboard menu" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
              <ProfileAvatar user={user} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{fullName}</p>
                <p className="mt-0.5 text-[11px] text-white/55">{roleLabel[user.role]}</p>
                <p className="truncate text-[10px] text-white/40">{user.email}</p>
              </div>
            </div>
          </div>

          <nav aria-label="Dashboard navigation" className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Workspace</p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== home && pathname.startsWith(`${item.href}/`));
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} aria-current={active ? "page" : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${active ? "bg-white/15 text-white shadow-sm" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-white/15" : "group-hover:bg-white/10"}`}><Icon className="h-[18px] w-[18px]" /></span>
                    <span>{item.label}</span>
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8dd8a7]" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/10 px-4 py-4">
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"><LogOut className="h-[18px] w-[18px]" /></span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="min-h-screen min-w-0 lg:pl-[260px]">
          {/* Keep the original dashboard layout: no additional desktop header. */}
          <main className="min-w-0 pt-[70px] lg:pt-0">
            {canViewPath ? children : <AccessDenied />}
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
