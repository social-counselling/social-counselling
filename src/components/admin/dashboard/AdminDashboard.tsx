"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Users, Wrench } from "lucide-react";
import { getAdminDashboardStats } from "@/services/admin/dashboard.api";
import RecentCounsellors from "./RecentCounsellors";
import ServicesOverview from "./ServicesOverview";
import QuickActions from "./QuickActions";
interface DashboardStats {
  totalCounsellors: number;
  activeCounsellors: number;
  totalServices: number;
  activeServices: number;
}

const statCards = [
  {
    key: "totalCounsellors",
    title: "Total Counsellors",
    icon: Users,
  },
  {
    key: "activeCounsellors",
    title: "Active Counsellors",
    icon: CheckCircle2,
  },
  {
    key: "totalServices",
    title: "Total Services",
    icon: BriefcaseBusiness,
  },
  {
    key: "activeServices",
    title: "Active Services",
    icon: Wrench,
  },
] as const;

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboardStats();

        if (mounted) {
          setStats(data);
        }
      } catch {
        if (mounted) {
          setError("Unable to load dashboard statistics.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#183b3b]">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your counselling platform.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          const value = loading ? null : (stats?.[card.key] ?? 0);

          return (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  {loading ? (
                    <div className="mt-3 h-9 w-16 animate-pulse rounded-lg bg-slate-200" />
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-[#183b3b]">
                      {value}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f3f0] text-[#2d716b]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <RecentCounsellors />
      <ServicesOverview />
      <QuickActions />
    </div>
  );
}
