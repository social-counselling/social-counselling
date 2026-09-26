"use client";

import { useEffect, useMemo, useState } from "react";
import { getAdminCounsellors } from "@/services/admin/counsellors.api";
import { getAdminSlots, type AdminSlot } from "@/services/admin/slots.api";
import {
  createAdminCounsellorSlot,
  deleteAdminCounsellorSlot,
  getAdminCounsellorSlots,
  type AdminCounsellorSlot,
} from "@/services/admin/counsellor-slots.api";

interface CounsellorOption {
  id: number;
  user: {
    firstName: string;
    lastName: string | null;
  };
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getToday() {
  return formatDate(new Date());
}

export default function CounsellorAvailabilityManagement() {
  const [counsellors, setCounsellors] = useState<CounsellorOption[]>([]);

  const [slots, setSlots] = useState<AdminSlot[]>([]);

  const [assignments, setAssignments] = useState<AdminCounsellorSlot[]>([]);

  const [selectedCounsellorId, setSelectedCounsellorId] = useState("");

  const [selectedDate, setSelectedDate] = useState(getToday());

  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Load counsellors and master slots.
   */
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError("");

        const [counsellorResponse, slotResponse] = await Promise.all([
          getAdminCounsellors({
            page: 1,
            limit: 100,
          }),
          getAdminSlots(),
        ]);

        setCounsellors(
          Array.isArray(counsellorResponse.data) ? counsellorResponse.data : [],
        );

        setSlots(
          Array.isArray(slotResponse)
            ? slotResponse.filter((slot) => slot.isActive)
            : [],
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load availability data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  /*
   * Load availability whenever counsellor/date changes.
   */
  useEffect(() => {
    if (!selectedCounsellorId || !selectedDate) {
      setAssignments([]);
      setSelectedSlotIds([]);
      return;
    }

    async function loadAvailability() {
      try {
        setLoadingAvailability(true);
        setError("");
        setSuccess("");

        const response = await getAdminCounsellorSlots(
          Number(selectedCounsellorId),
          selectedDate,
        );

        const data = Array.isArray(response) ? response : [];

        setAssignments(data);

        setSelectedSlotIds(
          data
            .filter((assignment) => assignment.status !== "BLOCKED")
            .map((assignment) => assignment.slotId),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load availability.",
        );

        setAssignments([]);
        setSelectedSlotIds([]);
      } finally {
        setLoadingAvailability(false);
      }
    }

    loadAvailability();
  }, [selectedCounsellorId, selectedDate]);

  const selectedAssignmentsBySlotId = useMemo(() => {
    return new Map(
      assignments.map((assignment) => [assignment.slotId, assignment]),
    );
  }, [assignments]);

  function toggleSlot(slotId: number) {
    setSuccess("");
    setError("");

    setSelectedSlotIds((current) =>
      current.includes(slotId)
        ? current.filter((id) => id !== slotId)
        : [...current, slotId],
    );
  }

  async function handleSave() {
    if (!selectedCounsellorId) {
      setError("Please select a counsellor.");
      return;
    }

    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const currentAssignmentMap = new Map(
        assignments.map((assignment) => [assignment.slotId, assignment]),
      );

      /*
       * Remove assignments that were unchecked.
       */
      const assignmentsToDelete = assignments.filter(
        (assignment) => !selectedSlotIds.includes(assignment.slotId),
      );

      await Promise.all(
        assignmentsToDelete.map((assignment) =>
          deleteAdminCounsellorSlot(assignment.id),
        ),
      );

      /*
       * Add newly selected slots.
       */
      const assignmentsToCreate = selectedSlotIds.filter(
        (slotId) => !currentAssignmentMap.has(slotId),
      );

      await Promise.all(
        assignmentsToCreate.map((slotId) =>
          createAdminCounsellorSlot({
            counsellorId: Number(selectedCounsellorId),
            slotId,
            date: selectedDate,
          }),
        ),
      );

      /*
       * Reload availability.
       */
      const response = await getAdminCounsellorSlots(
        Number(selectedCounsellorId),
        selectedDate,
      );

      const updatedAssignments = Array.isArray(response) ? response : [];

      setAssignments(updatedAssignments);

      setSelectedSlotIds(
        updatedAssignments.map((assignment) => assignment.slotId),
      );

      setSuccess("Counsellor availability saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save availability.",
      );
    } finally {
      setSaving(false);
    }
  }

  const selectedCounsellor = counsellors.find(
    (counsellor) => counsellor.id === Number(selectedCounsellorId),
  );

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-500">
        Loading availability management...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Counsellor Availability
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Assign master time slots to a counsellor for a specific date.
        </p>
      </div>

      <div className="space-y-6 p-5">
        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Counsellor
            </label>

            <select
              value={selectedCounsellorId}
              onChange={(event) => setSelectedCounsellorId(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
            >
              <option value="">Select counsellor</option>

              {counsellors.map((counsellor) => (
                <option key={counsellor.id} value={counsellor.id}>
                  {counsellor.user.firstName} {counsellor.user.lastName ?? ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              value={selectedDate}
              min={getToday()}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Selected counsellor */}
        {selectedCounsellor && (
          <div className="rounded-lg bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-500">Managing availability for</p>

            <p className="mt-1 font-medium text-gray-900">
              {selectedCounsellor.user.firstName}{" "}
              {selectedCounsellor.user.lastName ?? ""}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Slots */}
        {!selectedCounsellorId ? (
          <div className="rounded-lg border border-dashed border-gray-300 px-5 py-10 text-center">
            <p className="text-sm text-gray-500">
              Select a counsellor to manage their availability.
            </p>
          </div>
        ) : loadingAvailability ? (
          <div className="rounded-lg border border-gray-200 px-5 py-10 text-center text-sm text-gray-500">
            Loading availability...
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 px-5 py-10 text-center">
            <p className="text-sm text-gray-500">
              No active master slots available.
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Create a master slot above first.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Available Time Slots
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Select the slots when this counsellor is available.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => {
                const selected = selectedSlotIds.includes(slot.id);

                const existingAssignment = selectedAssignmentsBySlotId.get(
                  slot.id,
                );

                const isBooked = existingAssignment?.status === "BOOKED";

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleSlot(slot.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    } ${isBooked ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            selected ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {formatTime(slot.startTime)} →{" "}
                          {formatTime(slot.endTime)}
                        </p>

                        {isBooked && (
                          <p
                            className={`mt-1 text-xs ${
                              selected ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            Booked
                          </p>
                        )}
                      </div>

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border ${
                          selected ? "border-white bg-white" : "border-gray-300"
                        }`}
                      >
                        {selected && (
                          <span className="text-xs font-bold text-black">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Save */}
        {selectedCounsellorId && (
          <div className="flex justify-end border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loadingAvailability}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Availability"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
