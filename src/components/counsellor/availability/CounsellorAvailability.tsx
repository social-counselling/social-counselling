"use client";

import { useState } from "react";

import SingleDateAvailability from "./SingleDateAvailability";
import UpcomingAvailability from "./UpcomingAvailability";

export default function CounsellorAvailability() {
  const [singleDateOpen, setSingleDateOpen] = useState(false);

  const [upcomingOpen, setUpcomingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Availability
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your available dates and counselling time slots.
          </p>
        </div>

        {/* Actions */}
        <div className="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setSingleDateOpen(true)}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:border-gray-400 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>

            <p className="mt-2 text-sm text-gray-500">
              Select a date and choose the time slots when you are available.
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
              Manage Availability
            </span>
          </button>

          <button
            type="button"
            onClick={() => setUpcomingOpen(true)}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:border-gray-400 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Availability
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Select a date range and view your upcoming availability.
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
              View Availability
            </span>
          </button>
        </div>

        {/* Single Date Modal */}
        {singleDateOpen && (
          <SingleDateAvailability onClose={() => setSingleDateOpen(false)} />
        )}

        {/* Upcoming Modal */}
        {upcomingOpen && (
          <UpcomingAvailability onClose={() => setUpcomingOpen(false)} />
        )}
      </div>
    </main>
  );
}
