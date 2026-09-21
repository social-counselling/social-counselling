"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  RefreshCcw,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

import {
  getAdminCounsellors,
  type AdminCounsellorsMeta,
} from "@/app/services/admin-counsellors-api";

import type {
  AdminCounsellor,
} from "@/types/admin-counsellor";

import CounsellorCards from "./CounsellorCards";

export default function CounsellorsPage() {
  const [counsellors, setCounsellors] =
    useState<AdminCounsellor[]>([]);

  const [meta, setMeta] =
    useState<AdminCounsellorsMeta>({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });

  const [search, setSearch] =
    useState("");

  const [specialization, setSpecialization] =
    useState("all");

  const [language, setLanguage] =
    useState("all");

  const [status, setStatus] =
    useState("all");

  const [availability, setAvailability] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchCounsellors = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminCounsellors({
            search:
              search.trim() || undefined,

            specialization:
              specialization === "all"
                ? undefined
                : specialization,

            language:
              language === "all"
                ? undefined
                : language,

            status:
              status === "all"
                ? undefined
                : status,

            availability:
              availability === "all"
                ? undefined
                : availability,

            page: 1,
            limit: 10,
          });

        setCounsellors(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error(
          "Failed to fetch counsellors:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load counsellors",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      search,
      specialization,
      language,
      status,
      availability,
    ],
  );

  useEffect(() => {
    fetchCounsellors();
  }, [fetchCounsellors]);

  const resetFilters = () => {
    setSearch("");
    setSpecialization("all");
    setLanguage("all");
    setStatus("all");
    setAvailability("all");
  };

  return (
    <div className="p-5 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#238BE6]">
            People Management
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#183b3b] sm:text-3xl">
            Counsellors
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage counsellor profiles,
            specializations, availability
            and publication status.
          </p>
        </div>

        <Link
          href="/admin/counsellors/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#238BE6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1477ca]"
        >
          <Plus className="h-4 w-4" />
          Add Counsellor
        </Link>

      </div>

      {/* FILTERS */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto]">

          {/* SEARCH */}

          <div className="relative min-w-0">

            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search counsellors..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#238BE6] focus:bg-white focus:ring-2 focus:ring-[#238BE6]/10"
            />

          </div>

          {/* SPECIALIZATION */}

          <select
            value={specialization}
            onChange={(e) =>
              setSpecialization(
                e.target.value,
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#238BE6]"
          >
            <option value="all">
              All Specializations
            </option>

            <option value="Youth">
              Youth
            </option>

            <option value="Marriage">
              Marriage
            </option>

            <option value="Corporate">
              Corporate
            </option>

            <option value="Family">
              Family
            </option>

            <option value="Women">
              Women
            </option>
          </select>

          {/* LANGUAGE */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#238BE6]"
          >
            <option value="all">
              All Languages
            </option>

            <option value="English">
              English
            </option>

            <option value="Hindi">
              Hindi
            </option>

            <option value="Gujarati">
              Gujarati
            </option>

            <option value="Telugu">
              Telugu
            </option>

            <option value="Kannada">
              Kannada
            </option>
          </select>

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#238BE6]"
          >
            <option value="all">
              All Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>

          {/* AVAILABILITY */}

          <select
            value={availability}
            onChange={(e) =>
              setAvailability(
                e.target.value,
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#238BE6]"
          >
            <option value="all">
              All Availability
            </option>

            <option value="AVAILABLE">
              Available
            </option>

            <option value="UNAVAILABLE">
              Unavailable
            </option>
          </select>

          {/* RESET */}

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCcw className="h-4 w-4" />

            Reset
          </button>

        </div>

      </div>

      {/* RESULT COUNT */}

      <div className="mb-3 flex items-center justify-between">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {counsellors.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {meta.total}
          </span>{" "}
          counsellors
        </p>

        <Users className="h-4 w-4 text-slate-400" />

      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading counsellors...
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* CARDS */}

      {!loading && !error && (
        <CounsellorCards
          counsellors={counsellors}
        />
      )}

    </div>
  );
}