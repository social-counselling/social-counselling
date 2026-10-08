"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCallback, useEffect, useState } from "react";
import { Filter, Plus, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";

import {
  getAdminServices,
  type AdminServicesMeta,
} from "@/services/admin/services.api";

import type { AdminService } from "@/types/admin-service";

import ServiceCards from "./ServiceCards";

export default function ServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);

  const [meta, setMeta] = useState<AdminServicesMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminServices({
        search: search.trim() || undefined,

        category: category === "all" ? undefined : category,

        isActive: status === "all" ? undefined : status === "active",

        page: 1,
        limit: 10,
      });

      setServices(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error("Failed to fetch services:", err);

      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [search, category, status]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
  };

  return (
    <div className="p-5 sm:p-6 lg:p-8">
      {/* PAGE HEADER */}

      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#238BE6]">
            Content Management
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#183b3b] sm:text-3xl">
            Services
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage all counselling services and their content.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#238BE6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1477ca]"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      {/* FILTER CARD */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#238BE6] focus:bg-white focus:ring-2 focus:ring-[#238BE6]/10"
            />
          </div>

          {/* CATEGORY */}

          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "all")}
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white text-sm text-slate-600 focus:border-[#238BE6] focus:ring-[#238BE6]/10 lg:w-[190px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              <SelectItem value="SOCIAL_COUNSELLING">
                Social Counselling
              </SelectItem>

              <SelectItem value="EMPATHETIC_LISTENING">
                Empathetic Listening
              </SelectItem>
            </SelectContent>
          </Select>

          {/* STATUS */}

          <Select
            value={status}
            onValueChange={(value) => setStatus(value ?? "all")}
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white text-sm text-slate-600 focus:border-[#238BE6] focus:ring-[#238BE6]/10 lg:w-[160px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* RESET */}

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCcw className="h-4 w-4" />

            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* RESULT */}

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {services.length}
          </span>{" "}
          of <span className="font-semibold text-slate-700">{meta.total}</span>{" "}
          services
        </p>

        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <Filter className="h-3.5 w-3.5" />
          Manage your services
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading services...
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SERVICES */}

      {!loading && !error && <ServiceCards services={services} />}
    </div>
  );
}
