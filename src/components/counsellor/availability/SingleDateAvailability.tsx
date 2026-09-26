"use client";

import {
  getAdminCounsellorSlots,
  createAdminCounsellorSlot,
  deleteAdminCounsellorSlot,
  type AdminCounsellorSlot,
} from "@/services/admin/counsellor-slots.api";

import { getAdminSlots, type AdminSlot } from "@/services/admin/slots.api";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

const TEMP_COUNSELLOR_ID = 5;

interface Props {
  onClose: () => void;
}

function formatTime(time: string) {
  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function getTodayDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
}

export default function SingleDateAvailability({ onClose }: Props) {
  const [date, setDate] = useState("");

  const [slots, setSlots] = useState<AdminSlot[]>([]);

  const [assignments, setAssignments] = useState<AdminCounsellorSlot[]>([]);

  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /*
   * Load master slots
   */
  useEffect(() => {
    getAdminSlots()
      .then((data) => {
        setSlots(data.filter((slot) => slot.isActive));
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load time slots",
        );
      });
  }, []);

  /*
   * Load existing availability
   */
  useEffect(() => {
    if (!date) {
      setAssignments([]);
      setSelectedSlotIds([]);
      return;
    }

    setLoading(true);
    setError("");

    getAdminCounsellorSlots(TEMP_COUNSELLOR_ID, date)
      .then((data) => {
        setAssignments(data);

        setSelectedSlotIds(data.map((assignment) => assignment.slotId));
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load availability",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [date]);

  /*
   * Local slot selection
   */
  const toggleSlot = (slotId: number) => {
    setSelectedSlotIds((current) =>
      current.includes(slotId)
        ? current.filter((id) => id !== slotId)
        : [...current, slotId],
    );
  };

  /*
   * Save all changes
   */
  const handleSave = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const originalSlotIds = assignments.map(
        (assignment) => assignment.slotId,
      );

      /*
       * Slots that need to be deleted
       */
      const slotsToDelete = assignments.filter(
        (assignment) => !selectedSlotIds.includes(assignment.slotId),
      );

      /*
       * Slots that need to be created
       */
      const slotsToCreate = selectedSlotIds.filter(
        (slotId) => !originalSlotIds.includes(slotId),
      );

      /*
       * Delete removed slots
       */
      await Promise.all(
        slotsToDelete.map((assignment) =>
          deleteAdminCounsellorSlot(assignment.id),
        ),
      );

      /*
       * Create newly selected slots
       */
      await Promise.all(
        slotsToCreate.map((slotId) =>
          createAdminCounsellorSlot({
            counsellorId: TEMP_COUNSELLOR_ID,
            slotId,
            date,
          }),
        ),
      );

      /*
       * Reload saved state
       */
      const updated = await getAdminCounsellorSlots(TEMP_COUNSELLOR_ID, date);

      setAssignments(updated);

      setSelectedSlotIds(updated.map((assignment) => assignment.slotId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save availability",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Select Date & Time
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose your available counselling slots.
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

        {/* Body */}
        <div className="p-6">
          {/* Date */}
          <label
            htmlFor="availability-date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Date
          </label>

          <input
            id="availability-date"
            type="date"
            value={date}
            min={getTodayDate()}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-500"
          />

          {/* Slots */}
          {date && (
            <div className="mt-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">
                  Available Time Slots
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Select all times when you are available.
                </p>
              </div>

              {loading ? (
                <p className="text-sm text-gray-500">Loading availability...</p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No active time slots are available.
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {slots.map((slot) => {
                    const selected = selectedSlotIds.includes(slot.id);

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => toggleSlot(slot.id)}
                        className={`rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {formatTime(slot.startTime)}
                            </p>

                            <p
                              className={`text-sm ${
                                selected ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              to {formatTime(slot.endTime)}
                            </p>
                          </div>

                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                              selected
                                ? "border-white bg-white text-gray-900"
                                : "border-gray-300"
                            }`}
                          >
                            {selected && "✓"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !date || loading}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}
