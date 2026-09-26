"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Clock3, Star, Award } from "lucide-react";

import { getAdminCounsellor } from "@/services/admin/counsellors.api";
import { getAdminCounsellorSlots } from "@/services/admin/counsellor-slots.api";

const TEMP_COUNSELLOR_ID = "5";

function formatTime(time: string) {
  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

export default function CounsellorDashboard() {
  const [counsellor, setCounsellor] = useState<Awaited<
    ReturnType<typeof getAdminCounsellor>
  > | null>(null);

  const [todaySlots, setTodaySlots] = useState<
    Awaited<ReturnType<typeof getAdminCounsellorSlots>>
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const today = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        });

        const [counsellorData, slotsData] = await Promise.all([
          getAdminCounsellor(TEMP_COUNSELLOR_ID),
          getAdminCounsellorSlots(Number(TEMP_COUNSELLOR_ID), today),
        ]);

        console.log("COUNSELLOR DASHBOARD RESPONSE:", counsellorData);
        console.log("TODAY SLOTS RESPONSE:", slotsData);
        setCounsellor(counsellorData);
        setTodaySlots(slotsData);
      } catch (error) {
        console.error("Failed to load counsellor dashboard", error);
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
        </div>
      </div>
    );
  }

  if (!counsellor) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Unable to load counsellor information.
        </div>
      </div>
    );
  }

  const fullName = `${counsellor.user.firstName} ${
    counsellor.user.lastName ?? ""
  }`.trim();

  return (
    <div className="p-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {counsellor.user.firstName} 👋
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
                {counsellor.services.length ?? 0}
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
                {counsellor.avgRating.toFixed(1)}
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
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {todaySlots.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <p className="font-medium text-gray-900">
                  {formatTime(item.slot.startTime)}
                </p>

                <p className="text-sm text-gray-500">
                  to {formatTime(item.slot.endTime)}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
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
          My Specializations
        </h2>

        {counsellor.specializations.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No specializations added yet.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {counsellor.specializations.map((specialization) => (
              <span
                key={specialization}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
              >
                {specialization}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Development information */}
      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          Development mode: currently viewing the counsellor profile for{" "}
          <strong>{fullName}</strong> (ID: {TEMP_COUNSELLOR_ID}).
        </p>
      </div>
    </div>
  );
}
