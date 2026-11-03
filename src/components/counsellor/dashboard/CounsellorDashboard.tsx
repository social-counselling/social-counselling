"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Clock3, Star, Award } from "lucide-react";
import { formatSlotTime } from "@/lib/time/slot-time";
import {
  getCounsellorDashboard,
  getCounsellorSlots,
  type CounsellorDashboardResponse,
  type CounsellorSlot,
} from "@/services/counsellor/dashboard.api";

function getTodayDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
}

export default function CounsellorDashboard() {
  const [dashboard, setDashboard] =
    useState<CounsellorDashboardResponse | null>(null);

  const [todaySlots, setTodaySlots] = useState<CounsellorSlot[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const today = getTodayDate();

        const [dashboardData, slotsData] = await Promise.all([
          getCounsellorDashboard(),
          getCounsellorSlots(today),
        ]);

        console.log("COUNSELLOR DASHBOARD RESPONSE:", dashboardData);

        console.log("COUNSELLOR TODAY SLOTS RESPONSE:", slotsData);

        setDashboard(dashboardData);
        setTodaySlots(slotsData);
      } catch (error) {
        console.error("Failed to load counsellor dashboard:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded bg-gray-200" />

          <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="h-32 rounded-xl bg-gray-200" />
            <div className="h-32 rounded-xl bg-gray-200" />
            <div className="h-32 rounded-xl bg-gray-200" />
          </div>

          <div className="mt-8 h-64 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error || "Unable to load counsellor information."}
        </div>
      </div>
    );
  }

  const { counsellor, services } = dashboard;

  const firstName = counsellor.name.split(" ")[0];

  return (
    <div className="p-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {firstName} 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here is an overview of your counselling activities.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Services */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">My Services</p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {services.length}
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <BriefcaseBusiness className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Experience</p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {counsellor.experienceYears ?? 0} Years
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <Award className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rating</p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {Number(counsellor.avgRating ?? 0).toFixed(1)}
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-3">
              <Star className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's availability */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Availability
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your available counselling slots for today.
            </p>
          </div>

          <Clock3 className="h-5 w-5 text-gray-500" />
        </div>

        {todaySlots.length === 0 ? (
          <div className="mt-5 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
            No availability has been added for today.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {todaySlots.map((item) => (
              <div
                key={item.id}
                className="min-w-0 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-center sm:px-3"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs font-semibold leading-5 text-gray-900 sm:text-sm">
                    {formatSlotTime(item.slot.startTime)}
                  </span>
                  <span className="text-[11px] text-gray-500">–</span>
                  <span className="text-xs font-semibold leading-5 text-gray-900 sm:text-sm">
                    {formatSlotTime(item.slot.endTime)}
                  </span>
                </div>

                <span className="mt-1 inline-flex max-w-full rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium leading-4 text-gray-700 sm:text-xs">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specializations */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Professional Information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Credentials</p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {counsellor.credentials || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Reviews</p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {counsellor.totalReviews}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Experience</p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {counsellor.experienceText ||
                `${counsellor.experienceYears ?? 0} years`}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Status</p>

            <span className="mt-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              {counsellor.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
