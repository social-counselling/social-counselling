"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { logout, getCurrentUser } from "@/services/auth/auth.api";
import { clearAccessToken } from "@/lib/auth/auth-storage";

import { adminNavigation } from "@/data/admin-navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface AdminUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
  profileImageUrl: string | null;
  counsellorId: number | null;
}

export default function AdminSidebar({
  isOpen,
  onOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then((response) => {
        if (mounted) {
          setUser(response.user);
        }
      })
      .catch(() => {
        if (mounted) {
          setUser(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const fullName = user
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : "Admin";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Continue logout even if the backend request fails.
    } finally {
      clearAccessToken();
      onClose();
      router.replace("/login");
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =====================================================
          MOBILE TOP BAR
          Logo - Left
          Admin Profile - Right
      ====================================================== */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        {/* Mobile Logo */}
        <Link
          href="/"
          onClick={onClose}
          className="relative h-12 w-32 shrink-0"
        >
          <Image
            src="/images/logo/logo2.png"
            alt="Social Counselling"
            fill
            priority
            sizes="128px"
            className="object-contain object-left"
          />
        </Link>

        {/* Mobile Admin Profile
            Clicking profile opens sidebar */}
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open admin menu"
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#103f3d]/10 transition hover:ring-[#103f3d]/30 focus:outline-none focus:ring-2 focus:ring-[#103f3d]/40"
        >
          {user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl.replace(/\\/g, "/")}
              alt={fullName}
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center rounded-full bg-[#103f3d] text-sm font-semibold text-white">
              {initials || "A"}
            </span>
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[260px]
          flex-col
          bg-[#103f3d]
          text-white
          shadow-xl
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ===================================================
            SIDEBAR LOGO
            Logo only - no text
        ==================================================== */}
        <div className="flex h-[96px] shrink-0 items-center justify-center border-b border-white/10 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="relative h-[68px] w-[150px]"
          >
            <Image
              src="/images/logo/logo2.png"
              alt="Social Counselling"
              fill
              priority
              sizes="150px"
              className="object-contain brightness-0 invert"
            />
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin menu"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================================================
            ADMIN PROFILE
        ==================================================== */}
        <div className="border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
            {/* Profile Image */}
            {user?.profileImageUrl ? (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={user.profileImageUrl.replace(/\\/g, "/")}
                  alt={fullName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
                {initials || "A"}
              </div>
            )}

            {/* Admin Name */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {fullName}
              </p>

              <p className="mt-0.5 text-[11px] text-white/50">
                {user?.role === "ADMIN" ? "Administrator" : "Admin"}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Management
          </p>

          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-colors
                      ${
                        active
                          ? "bg-white/15"
                          : "bg-transparent group-hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <span>{item.label}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8dd8a7]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            LOGOUT
        ==================================================== */}
        <div className="shrink-0 border-t border-white/10 px-4 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <LogOut className="h-[18px] w-[18px]" />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
