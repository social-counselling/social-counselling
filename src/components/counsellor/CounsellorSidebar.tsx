"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  BriefcaseBusiness,
  X,
} from "lucide-react";

import { logout, getCurrentUser } from "@/services/auth/auth.api";
import { clearAccessToken } from "@/lib/auth/auth-storage";
import { resolveImageUrl } from "@/lib/image-url";

interface CurrentUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
  profileImageUrl: string | null;
  counsellorId: number | null;
}

const navigation = [
  { label: "Dashboard", href: "/counsellor", icon: LayoutDashboard },
  { label: "My Profile", href: "/counsellor/profile", icon: UserRound },
  { label: "My Services", href: "/counsellor/services", icon: BriefcaseBusiness },
  { label: "Availability", href: "/counsellor/availability", icon: Clock3 },
  { label: "Bookings", href: "/counsellor/bookings", icon: CalendarDays },
  { label: "Settings", href: "/counsellor/settings", icon: Settings },
];

export default function CounsellorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCurrentUser()
      .then((response) => { if (mounted) setUser(response.user); })
      .catch(() => { if (mounted) setUser(null); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const fullName = user ? `${user.firstName} ${user.lastName ?? ""}`.trim() : "Counsellor";
  const initials = fullName.split(" ").filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Clear the local session even if the backend logout request fails.
    } finally {
      clearAccessToken();
      router.replace("/login");
    }
  };

  const activeFor = (href: string) =>
    href === "/counsellor" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        <Link href="/" className="relative h-12 w-32 shrink-0" aria-label="Social Counselling home">
          <Image src="/images/logo/logo2.png" alt="Social Counselling" fill priority sizes="128px" className="object-contain object-left" />
        </Link>
        <button type="button" onClick={() => setIsOpen(true)} aria-label="Open counsellor menu" className="flex h-10 items-center gap-2 rounded-full border border-slate-200 p-1.5 pr-3 transition hover:bg-slate-50">
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#e7f3f0] text-xs font-semibold text-[#103f3d]">
            {user?.profileImageUrl ? (
              <Image src={resolveImageUrl(user.profileImageUrl)} alt={fullName} fill sizes="28px" className="object-cover" unoptimized />
            ) : initials || "C"}
          </span>
          <span className="max-w-28 truncate text-xs font-semibold text-[#103f3d]">{fullName}</span>
        </button>
      </div>

      {isOpen && (
        <button type="button" aria-label="Close counsellor menu overlay" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col bg-[#103f3d] text-white shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="relative flex h-[96px] shrink-0 items-center justify-center border-b border-white/10 px-5">
          <Link href="/" className="relative h-[68px] w-[150px]" onClick={() => setIsOpen(false)}>
            <Image src="/images/logo/logo2.png" alt="Social Counselling" fill priority sizes="150px" className="object-contain brightness-0 invert" />
          </Link>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close counsellor menu" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm font-semibold text-white">
              {user?.profileImageUrl ? (
                <Image src={resolveImageUrl(user.profileImageUrl)} alt={fullName} fill sizes="44px" className="object-cover" unoptimized />
              ) : initials || "C"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{fullName}</p>
              <p className="mt-0.5 text-[11px] text-white/55">Counsellor workspace</p>
            </div>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Workspace</p>
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeFor(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${active ? "bg-white/15 text-white shadow-sm" : "text-white/65 hover:bg-white/8 hover:text-white"}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-white/15" : "group-hover:bg-white/10"}`}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
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
    </>
  );
}
