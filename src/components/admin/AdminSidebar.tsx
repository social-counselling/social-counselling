"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/data/admin-navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}

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
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}

        <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-white/10 px-5">

          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/images/logo/logo2.png"
                alt="Social Counselling"
                fill
                priority
                className="object-contain brightness-0 invert"
              />
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-tight">
                Social Counselling
              </p>

              <p className="mt-0.5 text-[11px] text-white/55">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Mobile close */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation */}

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

        {/* Help */}

        <div className="shrink-0 p-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

            <p className="text-sm font-semibold text-white">
              Need Help?
            </p>

            <p className="mt-1 text-xs leading-5 text-white/50">
              Check documentation or contact support.
            </p>

            <button
              type="button"
              className="mt-3 w-full rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#103f3d] transition hover:bg-white/90"
            >
              Get Help
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}