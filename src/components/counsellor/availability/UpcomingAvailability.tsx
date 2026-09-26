"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  getAdminCounsellorSlots,
  type AdminCounsellorSlot,
} from "@/services/admin/counsellor-slots.api";

const TEMP_COUNSELLOR_ID = 5;

interface Props {
  onClose: () => void;
}

function getTodayDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
}

function formatTime(time: string) {
  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UpcomingAvailability({ onClose }: Props) {
  const [rangeStart, setRangeStart] = useState("");

  const [rangeEnd, setRangeEnd] = useState("");

  const [upcomingAvailability, setUpcomingAvailability] = useState<
    {
      date: string;
      assignments: AdminCounsellorSlot[];
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLoadRange = async () => {
    if (!rangeStart || !rangeEnd) {
      setError("Please select both start and end dates.");
      return;
    }

    if (rangeEnd < rangeStart) {
      setError("End date cannot be before start date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const start = new Date(`${rangeStart}T00:00:00`);

      const end = new Date(`${rangeEnd}T00:00:00`);

      const dates: string[] = [];

      const current = new Date(start);

      while (current <= end) {
        dates.push(current.toLocaleDateString("en-CA"));

        current.setDate(current.getDate() + 1);
      }

      const results = await Promise.all(
        dates.map(async (date) => {
          const data = await getAdminCounsellorSlots(TEMP_COUNSELLOR_ID, date);

          return {
            date,
            assignments: data,
          };
        }),
      );

      setUpcomingAvailability(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load availability",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Availability
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View your availability for a selected date range.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="range-start"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                From
              </label>

              <input
                id="range-start"
                type="date"
                value={rangeStart}
                min={getTodayDate()}
                onChange={(event) => setRangeStart(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="range-end"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                To
              </label>

              <input
                id="range-end"
                type="date"
                value={rangeEnd}
                min={rangeStart || getTodayDate()}
                onChange={(event) => setRangeEnd(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleLoadRange}
            disabled={loading}
            className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Loading..." : "Show Availability"}
          </button>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6">
          {upcomingAvailability.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">
                Select a date range to view upcoming availability.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAvailability.map((day) => (
                <div
                  key={day.date}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {formatDate(day.date)}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {day.assignments.length} available slot
                        {day.assignments.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {day.assignments.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {day.assignments.map((assignment) => (
                          <span
                            key={assignment.id}
                            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
                          >
                            {formatTime(assignment.slot.startTime)} -{" "}
                            {formatTime(assignment.slot.endTime)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500">
                        No availability
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
