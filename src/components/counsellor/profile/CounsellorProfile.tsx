"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Globe2,
  Mail,
  Pencil,
  Phone,
  Star,
  UserRound,
  X,
} from "lucide-react";

import {
  getCounsellorProfile,
  updateCounsellorProfile,
  type CounsellorProfile as CounsellorProfileData,
} from "@/services/counsellor/profile.api";

export default function CounsellorProfile() {
  const [counsellor, setCounsellor] = useState<CounsellorProfileData | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    credentials: "",
    bio: "",
    mantra: "",
    coverage: "",
    experienceYears: "",
    experienceText: "",
    specializations: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const data = await getCounsellorProfile();

        console.log("COUNSELLOR PROFILE RESPONSE:", data);

        setCounsellor(data);
      } catch (error) {
        console.error("Failed to load counsellor profile:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load profile.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function openEditProfile() {
    if (!counsellor) {
      return;
    }

    setForm({
      credentials: counsellor.credentials ?? "",
      bio: counsellor.bio ?? "",
      mantra: counsellor.mantra ?? "",
      coverage: counsellor.coverage ?? "",
      experienceYears:
        counsellor.experienceYears !== null
          ? String(counsellor.experienceYears)
          : "",
      experienceText: counsellor.experienceText ?? "",
      specializations: counsellor.specializations?.join(", ") ?? "",
    });

    setError("");
    setSuccess("");
    setIsEditing(true);
  }

  function closeEditProfile() {
    if (saving) {
      return;
    }

    setIsEditing(false);
    setError("");
  }

  async function handleUpdateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const experienceYears = form.experienceYears.trim()
      ? Number(form.experienceYears)
      : undefined;

    if (
      experienceYears !== undefined &&
      (!Number.isInteger(experienceYears) || experienceYears < 0)
    ) {
      setError("Experience years must be a valid positive number.");
      return;
    }

    const specializations = form.specializations
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      setSaving(true);

      const updated = await updateCounsellorProfile({
        credentials: form.credentials.trim() || undefined,

        bio: form.bio.trim() || undefined,

        mantra: form.mantra.trim() || undefined,

        coverage: form.coverage.trim() || undefined,

        experienceYears,

        experienceText: form.experienceText.trim() || undefined,

        specializations,
      });

      console.log("UPDATED COUNSELLOR PROFILE RESPONSE:", updated);

      setCounsellor(updated);

      setIsEditing(false);

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update counsellor profile:", error);

      setError(
        error instanceof Error ? error.message : "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-6 h-64 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (error && !counsellor) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-900">Unable to load profile</h1>

          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!counsellor?.user) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-900">Unable to load profile</h1>

          <p className="mt-1 text-sm text-red-700">
            Counsellor profile information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const fullName = `${counsellor.user.firstName} ${
    counsellor.user.lastName ?? ""
  }`.trim();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your personal and professional information.
          </p>
        </div>

        <button
          type="button"
          onClick={openEditProfile}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Profile summary */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {counsellor.user.profileImageUrl ? (
            <img
              src={counsellor.user.profileImageUrl}
              alt={fullName}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-2xl font-semibold text-white">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>

            <p className="mt-1 text-sm text-gray-500">
              {counsellor.credentials ?? "Professional Counsellor"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {counsellor.status}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                <Star className="h-3.5 w-3.5" />

                {Number(counsellor.avgRating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal information */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <UserRound className="h-5 w-5 text-gray-500" />

          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <InfoItem
            label="Email"
            value={counsellor.user.email}
            icon={<Mail className="h-4 w-4" />}
          />

          <InfoItem
            label="Phone"
            value={counsellor.user.phone ?? "Not provided"}
            icon={<Phone className="h-4 w-4" />}
          />

          <InfoItem
            label="Gender"
            value={counsellor.user.gender || "Not provided"}
          />

          <InfoItem
            label="Date of Birth"
            value={
              counsellor.user.dateOfBirth
                ? new Date(counsellor.user.dateOfBirth).toLocaleDateString(
                    "en-IN",
                  )
                : "Not provided"
            }
            icon={<CalendarDays className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Professional information */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <BriefcaseBusiness className="h-5 w-5 text-gray-500" />

          <h2 className="text-lg font-semibold text-gray-900">
            Professional Information
          </h2>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <InfoItem
            label="Experience"
            value={
              counsellor.experienceText ??
              (counsellor.experienceYears
                ? `${counsellor.experienceYears} years`
                : "Not provided")
            }
          />

          <InfoItem
            label="Coverage"
            value={counsellor.coverage ?? "Not provided"}
            icon={<Globe2 className="h-4 w-4" />}
          />

          <InfoItem
            label="Mantra"
            value={counsellor.mantra ?? "Not provided"}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-gray-700">Bio</p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {counsellor.bio ?? "No bio provided."}
          </p>
        </div>
      </section>

      {/* Languages */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Languages</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {counsellor.languages?.length ? (
            counsellor.languages.map((language) => (
              <span
                key={language.id}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {language.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No languages added.</p>
          )}
        </div>
      </section>

      {/* Specializations */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Specializations</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {counsellor.specializations?.length ? (
            counsellor.specializations.map((specialization) => (
              <span
                key={specialization}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {specialization}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No specializations added.</p>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">My Services</h2>

        <div className="mt-4 space-y-3">
          {counsellor.services?.length ? (
            counsellor.services.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.service.title}
                  </p>

                  {item.service.subtitle && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.service.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No services assigned.</p>
          )}
        </div>
      </section>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your professional information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditProfile}
                disabled={saving}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-5 p-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Credentials
                </label>

                <input
                  type="text"
                  value={form.credentials}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      credentials: event.target.value,
                    })
                  }
                  placeholder="e.g. MSc Psychology, MPhil"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Experience Years
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.experienceYears}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      experienceYears: event.target.value,
                    })
                  }
                  placeholder="e.g. 8"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Experience Text
                </label>

                <input
                  type="text"
                  value={form.experienceText}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      experienceText: event.target.value,
                    })
                  }
                  placeholder="e.g. 8+ years of counselling experience"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Coverage
                </label>

                <input
                  type="text"
                  value={form.coverage}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      coverage: event.target.value,
                    })
                  }
                  placeholder="e.g. Individual, Couples, Family"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mantra
                </label>

                <input
                  type="text"
                  value={form.mantra}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      mantra: event.target.value,
                    })
                  }
                  placeholder="Your counselling philosophy"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Specializations
                </label>

                <input
                  type="text"
                  value={form.specializations}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      specializations: event.target.value,
                    })
                  }
                  placeholder="Marriage, Anxiety, Stress"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Separate multiple specializations with commas.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Bio</label>

                <textarea
                  value={form.bio}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      bio: event.target.value,
                    })
                  }
                  rows={5}
                  placeholder="Tell clients about your counselling experience and approach."
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeEditProfile}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <div className="mt-1 flex items-center gap-2 text-sm text-gray-900">
        {icon && <span className="text-gray-400">{icon}</span>}

        <span>{value}</span>
      </div>
    </div>
  );
}
