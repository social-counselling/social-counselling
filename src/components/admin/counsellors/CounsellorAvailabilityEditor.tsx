"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, Loader2, Save } from "lucide-react";

import {
  getAdminCounsellorSlots,
  createAdminCounsellorSlot,
  deleteAdminCounsellorSlot,
  type AdminCounsellorSlot,
} from "@/services/admin/counsellor-slots.api";

import { getAdminSlots, type AdminSlot } from "@/services/admin/slots.api";

interface Props {
  counsellorId?: string;
}

function getTodayDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
}

function formatTime(time: string) {
  if (!time) {
    return "";
  }

  const date = time.includes("T")
    ? new Date(time)
    : new Date(`1970-01-01T${time}`);

  if (Number.isNaN(date.getTime())) {
    return time;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

export default function CounsellorAvailabilityEditor({ counsellorId }: Props) {
  const isEditMode = Boolean(counsellorId);

  const [date, setDate] = useState(getTodayDate());

  const [slots, setSlots] = useState<AdminSlot[]>([]);

  const [assignments, setAssignments] = useState<AdminCounsellorSlot[]>([]);

  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);

  const [loadingSlots, setLoadingSlots] = useState(true);

  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  /*
   * Load master time slots.
   */
  useEffect(() => {
    const loadSlots = async () => {
      try {
        setLoadingSlots(true);
        setError(null);

        const data = await getAdminSlots();

        setSlots(data.filter((slot) => slot.isActive));
      } catch (error) {
        console.error("LOAD MASTER SLOTS ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load time slots.",
        );
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, []);

  /*
   * Load counsellor availability for selected date.
   */
  useEffect(() => {
    if (!counsellorId || !date) {
      setAssignments([]);
      setSelectedSlotIds([]);
      return;
    }

    const loadAvailability = async () => {
      try {
        setLoadingAvailability(true);
        setError(null);
        setSuccess(null);

        const data = await getAdminCounsellorSlots(Number(counsellorId), date);

        setAssignments(data);

        setSelectedSlotIds(
          data
            .filter((assignment) => assignment.status !== "BLOCKED")
            .map((assignment) => assignment.slotId),
        );
      } catch (error) {
        console.error("LOAD COUNSELLOR AVAILABILITY ERROR:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load availability.",
        );
      } finally {
        setLoadingAvailability(false);
      }
    };

    loadAvailability();
  }, [counsellorId, date]);

  /*
   * Existing assignments by slot ID.
   */
  const assignmentMap = useMemo(() => {
    return new Map(
      assignments.map((assignment) => [assignment.slotId, assignment]),
    );
  }, [assignments]);

  /*
   * Toggle availability.
   */
  const toggleSlot = (slotId: number) => {
    const assignment = assignmentMap.get(slotId);

    /*
     * Never modify a booked slot from this editor.
     */
    if (assignment?.status === "BOOKED") {
      return;
    }

    setSuccess(null);

    setSelectedSlotIds((current) =>
      current.includes(slotId)
        ? current.filter((id) => id !== slotId)
        : [...current, slotId],
    );
  };

  /*
   * Save availability changes.
   */
  const handleSave = async () => {
    if (!counsellorId) {
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const originalSlotIds = assignments
        .filter((assignment) => assignment.status !== "BLOCKED")
        .map((assignment) => assignment.slotId);

      /*
       * Slots removed by admin.
       */
      const slotsToDelete = assignments.filter(
        (assignment) =>
          assignment.status !== "BOOKED" &&
          !selectedSlotIds.includes(assignment.slotId),
      );

      /*
       * Slots newly selected by admin.
       */
      const slotsToCreate = selectedSlotIds.filter(
        (slotId) => !originalSlotIds.includes(slotId),
      );

      /*
       * Remove deleted availability.
       */
      await Promise.all(
        slotsToDelete.map((assignment) =>
          deleteAdminCounsellorSlot(assignment.id),
        ),
      );

      /*
       * Create new availability.
       */
      await Promise.all(
        slotsToCreate.map((slotId) =>
          createAdminCounsellorSlot({
            counsellorId: Number(counsellorId),
            slotId,
            date,
          }),
        ),
      );

      /*
       * Reload latest availability.
       */
      const updated = await getAdminCounsellorSlots(Number(counsellorId), date);

      setAssignments(updated);

      setSelectedSlotIds(
        updated
          .filter((assignment) => assignment.status !== "BLOCKED")
          .map((assignment) => assignment.slotId),
      );

      setSuccess("Availability updated successfully.");
    } catch (error) {
      console.error("SAVE COUNSELLOR AVAILABILITY ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Failed to save availability.",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Create mode.
   *
   * Counsellor ID does not exist until the counsellor
   * has been created.
   */
  if (!isEditMode) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#238BE6]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#183b3b]">
                Availability
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Save the counsellor first to configure availability.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Availability will be available after creation.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Create the counsellor first, then add dates and time slots.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#238BE6]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#183b3b]">
                Availability
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the date and time slots when this counsellor is
                available.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-slate-400" />

            <span className="text-xs text-slate-500">
              {selectedSlotIds.length} selected
            </span>
          </div>
        </div>
      </div>

      {/* BODY */}

      <div className="p-5 sm:p-6">
        {/* DATE */}

        <div className="max-w-sm">
          <label
            htmlFor="counsellor-availability-date"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Date
          </label>

          <input
            id="counsellor-availability-date"
            type="date"
            min={getTodayDate()}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10"
          />
        </div>

        {/* FEEDBACK */}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* SLOTS */}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Time Slots
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Select all time slots available for this date.
              </p>
            </div>
          </div>

          {loadingSlots || loadingAvailability ? (
            <div className="flex min-h-32 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading availability...
              </div>
            </div>
          ) : slots.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
              <Clock3 className="mx-auto h-7 w-7 text-slate-400" />

              <p className="mt-3 text-sm font-medium text-slate-700">
                No active time slots found.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Create active master slots from Admin → Slots first.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => {
                const assignment = assignmentMap.get(slot.id);

                const isBooked = assignment?.status === "BOOKED";

                const isBlocked = assignment?.status === "BLOCKED";

                const isSelected = selectedSlotIds.includes(slot.id);

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleSlot(slot.id)}
                    className={[
                      "relative flex min-h-[72px] items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                      isBooked
                        ? "cursor-not-allowed border-amber-200 bg-amber-50"
                        : isSelected
                          ? "border-[#238BE6] bg-blue-50"
                          : isBlocked
                            ? "border-slate-200 bg-slate-50"
                            : "border-slate-200 bg-white hover:border-[#238BE6]/50 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </p>

                      {isBooked ? (
                        <p className="mt-1 text-[11px] font-semibold text-amber-700">
                          Booked
                        </p>
                      ) : isBlocked ? (
                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                          Blocked
                        </p>
                      ) : isSelected ? (
                        <p className="mt-1 text-[11px] font-semibold text-[#238BE6]">
                          Available
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-slate-400">
                          Not available
                        </p>
                      )}
                    </div>

                    {!isBooked && (
                      <span
                        className={[
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition",
                          isSelected
                            ? "border-[#238BE6] bg-[#238BE6] text-white"
                            : "border-slate-300 bg-white text-transparent",
                        ].join(" ")}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SAVE */}

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Changes apply only to{" "}
            <span className="font-semibold text-slate-700">{date}</span>.
          </p>

          <button
            type="button"
            disabled={saving || loadingSlots || loadingAvailability}
            onClick={handleSave}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#238BE6] px-5 text-sm font-semibold text-white transition hover:bg-[#1477ca] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </section>
  );
}
