"use client";

import { useEffect, useState } from "react";
import {
  createAdminSlot,
  deleteAdminSlot,
  getAdminSlots,
  updateAdminSlot,
  type AdminSlot,
} from "@/services/admin/slots.api";

interface SlotForm {
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const emptyForm: SlotForm = {
  startTime: "",
  endTime: "",
  isActive: true,
};

function formatTime(value: string) {
  const date = new Date(value);

  return date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function SlotsManagement() {
  const [slots, setSlots] = useState<AdminSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AdminSlot | null>(null);

  const [form, setForm] = useState<SlotForm>(emptyForm);
  const [error, setError] = useState("");

  async function loadSlots() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminSlots();

      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load slots");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlots();
  }, []);

  function openCreateForm() {
    setEditingSlot(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(slot: AdminSlot) {
    setEditingSlot(slot);

    const start = new Date(slot.startTime);
    const end = new Date(slot.endTime);

    const formatInputTime = (date: Date) =>
      date.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    setForm({
      startTime: formatInputTime(start),
      endTime: formatInputTime(end),
      isActive: slot.isActive,
    });

    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingSlot(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.startTime || !form.endTime) {
      setError("Please select both start and end time.");
      return;
    }

    if (form.startTime >= form.endTime) {
      setError("End time must be after start time.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingSlot) {
        await updateAdminSlot(editingSlot.id, {
          startTime: form.startTime,
          endTime: form.endTime,
          isActive: form.isActive,
        });
      } else {
        await createAdminSlot({
          startTime: form.startTime,
          endTime: form.endTime,
          isActive: form.isActive,
        });
      }

      await loadSlots();
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save slot");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slot: AdminSlot) {
    const confirmed = window.confirm(
      `Delete ${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteAdminSlot(slot.id);

      await loadSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete slot");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Slots</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the master counselling time slots.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Add Slot
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Slots */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Master Time Slots
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            These slots can later be assigned to individual counsellors.
          </p>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            Loading slots...
          </div>
        ) : slots.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-gray-500">No time slots found.</p>

            <button
              type="button"
              onClick={openCreateForm}
              className="mt-3 text-sm font-medium text-black underline"
            >
              Create your first slot
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-gray-100 px-4 py-2.5">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatTime(slot.startTime)}
                    </span>

                    <span className="mx-2 text-gray-400">→</span>

                    <span className="text-sm font-semibold text-gray-900">
                      {formatTime(slot.endTime)}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      slot.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {slot.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(slot)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(slot)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingSlot ? "Edit Time Slot" : "Add Time Slot"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Slot times are based on Indian Standard Time.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Start Time
                </label>

                <input
                  type="time"
                  value={form.startTime}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      startTime: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  End Time
                </label>

                <input
                  type="time"
                  value={form.endTime}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      endTime: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                  required
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isActive: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <span className="text-sm text-gray-700">Active</span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingSlot
                      ? "Update Slot"
                      : "Create Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
