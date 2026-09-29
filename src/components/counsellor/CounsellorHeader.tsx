"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

import { getCurrentUser } from "@/services/auth/auth.api";

interface CurrentUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
  profileImageUrl: string | null;
  counsellorId: number | null;
}

export default function CounsellorHeader() {
  const [user, setUser] = useState<CurrentUser | null>(null);

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
    : "Counsellor";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Page identity */}
      <div>
        <p className="text-sm font-medium text-gray-900">Counsellor Panel</p>

        <p className="text-xs text-gray-500">
          Manage your counselling activities
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gray-900" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
        >
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={fullName}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
              {initials || "C"}
            </div>
          )}

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-gray-900">{fullName}</p>

            <p className="text-xs text-gray-500">Counsellor</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
