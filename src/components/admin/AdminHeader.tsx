"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-[76px] border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex min-w-0 flex-1 items-center gap-3">

          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#183b3b] hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}

          <div className="relative hidden w-full max-w-[500px] sm:block">

            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              placeholder="Search anything..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#238BE6] focus:bg-white focus:ring-2 focus:ring-[#238BE6]/10"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#183b3b] transition hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Admin Profile */}

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183b3b] text-sm font-semibold text-white">
              A
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold text-[#183b3b]">
                Admin User
              </span>

              <span className="block text-[11px] text-slate-400">
                Super Admin
              </span>
            </span>
          </button>

        </div>

      </div>

    </header>
  );
}