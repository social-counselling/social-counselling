"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCcw,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

import {
  getAdminCounsellors,
  type AdminCounsellorsMeta,
} from "@/services/admin/counsellors.api";

import {
  getAdminLanguages,
  type AdminLanguage,
} from "@/services/admin/languages.api";

import type {
  AdminCounsellor,
  CounsellorStatus,
} from "@/types/admin-counsellor";

import CounsellorCards from "./CounsellorCards";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

export default function CounsellorsPage() {
  const [counsellors, setCounsellors] = useState<AdminCounsellor[]>([]);

  const [page, setPage] = useState(1);

  const [meta, setMeta] = useState<AdminCounsellorsMeta>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });

  /* ---------------------------------------------------------
   * Filters
   * --------------------------------------------------------- */

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [specialization, setSpecialization] = useState("all");
  const [language, setLanguage] = useState("all");
  const [status, setStatus] = useState<"all" | CounsellorStatus>("all");

  /* ---------------------------------------------------------
   * Languages
   * --------------------------------------------------------- */

  const [languages, setLanguages] = useState<AdminLanguage[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);

  /* ---------------------------------------------------------
   * UI state
   * --------------------------------------------------------- */

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------------------------------------------------
   * Debounce search
   * --------------------------------------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /* ---------------------------------------------------------
   * Load active languages
   * --------------------------------------------------------- */

  useEffect(() => {
    let mounted = true;

    const loadLanguages = async () => {
      try {
        setLoadingLanguages(true);

        const response = await getAdminLanguages();

        if (!mounted) {
          return;
        }

        setLanguages(
          Array.isArray(response)
            ? response.filter((languageItem) => languageItem.isActive)
            : [],
        );
      } catch (err) {
        console.error("Failed to load languages:", err);

        if (mounted) {
          setLanguages([]);
        }
      } finally {
        if (mounted) {
          setLoadingLanguages(false);
        }
      }
    };

    loadLanguages();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------------------------------------------------
   * Fetch counsellors
   * --------------------------------------------------------- */

  const fetchCounsellors = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminCounsellors({
        search: debouncedSearch || undefined,

        specialization: specialization === "all" ? undefined : specialization,

        languageId: language === "all" ? undefined : language,

        status: status === "all" ? undefined : status,

        page,
        limit: PAGE_SIZE,
      });

      setCounsellors(Array.isArray(response.data) ? response.data : []);

      setMeta(
        response.meta ?? {
          page,
          limit: PAGE_SIZE,
          total: 0,
          totalPages: 1,
        },
      );
    } catch (err) {
      console.error("Failed to fetch counsellors:", err);

      setError(
        err instanceof Error ? err.message : "Failed to load counsellors",
      );

      setCounsellors([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, specialization, language, status, page]);

  useEffect(() => {
    fetchCounsellors();
  }, [fetchCounsellors]);

  /* ---------------------------------------------------------
   * Filter handlers
   * --------------------------------------------------------- */

  const handleSpecializationChange = (value: string) => {
    setSpecialization(value);
    setPage(1);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    if (value === "all" || value === "ACTIVE" || value === "INACTIVE") {
      setStatus(value);
      setPage(1);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSpecialization("all");
    setLanguage("all");
    setStatus("all");
    setPage(1);
  };

  /* ---------------------------------------------------------
   * Pagination
   * --------------------------------------------------------- */

  const hasPreviousPage = page > 1;
  const hasNextPage = page < meta.totalPages;

  const goToPreviousPage = () => {
    if (!hasPreviousPage || loading) {
      return;
    }

    setPage((currentPage) => currentPage - 1);
  };

  const goToNextPage = () => {
    if (!hasNextPage || loading) {
      return;
    }

    setPage((currentPage) => currentPage + 1);
  };

  /* ---------------------------------------------------------
   * Render
   * --------------------------------------------------------- */

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
            Manage counsellor profiles, specializations and services.
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
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]">
          {/* SEARCH */}
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Search counsellors..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#238BE6] focus:bg-white focus:ring-2 focus:ring-[#238BE6]/10"
            />
          </div>

          {/* SPECIALIZATION */}
          <select
            value={specialization}
            onChange={(event) => {
              handleSpecializationChange(event.target.value);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10"
          >
            <option value="all">All Specializations</option>

            <option value="Youth">Youth</option>

            <option value="Marriage">Marriage</option>

            <option value="Corporate">Corporate</option>

            <option value="Family">Family</option>

            <option value="Women">Women</option>
          </select>

          {/* LANGUAGE */}
          <select
            value={language}
            onChange={(event) => {
              handleLanguageChange(event.target.value);
            }}
            disabled={loadingLanguages}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="all">
              {loadingLanguages ? "Loading Languages..." : "All Languages"}
            </option>

            {languages.map((languageItem) => (
              <option key={languageItem.id} value={String(languageItem.id)}>
                {languageItem.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(event) => {
              handleStatusChange(event.target.value);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-[#238BE6] focus:ring-2 focus:ring-[#238BE6]/10"
          >
            <option value="all">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="INACTIVE">Inactive</option>
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

      {/* RESULT SUMMARY */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {counsellors.length}
          </span>{" "}
          of <span className="font-semibold text-slate-700">{meta.total}</span>{" "}
          counsellors
        </p>

        <Users className="h-4 w-4 text-slate-400" />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm font-medium text-slate-500">
            Loading counsellors...
          </p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchCounsellors}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && counsellors.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Users className="h-5 w-5 text-slate-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-700">
            No counsellors found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* COUNSELLOR CARDS */}
      {!loading && !error && counsellors.length > 0 && (
        <CounsellorCards counsellors={counsellors} />
      )}

      {/* PAGINATION */}
      {!loading && !error && meta.total > 0 && (
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Page{" "}
            <span className="font-semibold text-slate-700">{meta.page}</span> of{" "}
            <span className="font-semibold text-slate-700">
              {meta.totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPreviousPage || loading}
              onClick={goToPreviousPage}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="min-w-16 text-center text-xs text-slate-500">
              {meta.page} / {meta.totalPages}
            </span>

            <button
              type="button"
              disabled={!hasNextPage || loading}
              onClick={goToNextPage}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400">
            {meta.total} total counsellors
          </p>
        </div>
      )}
    </div>
  );
}
