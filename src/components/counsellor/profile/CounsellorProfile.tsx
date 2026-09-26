"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Globe2,
  Mail,
  Phone,
  Star,
  UserRound,
} from "lucide-react";

import { getAdminCounsellor } from "@/services/admin/counsellors.api";

const TEMP_COUNSELLOR_ID = "5";

type Counsellor = Awaited<ReturnType<typeof getAdminCounsellor>>;

export default function CounsellorProfile() {
  const [counsellor, setCounsellor] = useState<Counsellor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getAdminCounsellor(TEMP_COUNSELLOR_ID);
        setCounsellor(data);
      } catch (error) {
        console.error("Failed to load counsellor profile", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-64 animate-pulse rounded-xl bg-gray-200" />
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
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your personal and professional information.
        </p>
      </div>

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
                {counsellor.avgRating.toFixed(1)}
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

          <InfoItem label="Gender" value={counsellor.user.gender} />

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
