"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import {
  getAdminClients,
  updateAdminClientStatus,
  type AdminClient,
} from "@/services/admin/users.api";

const PAGE_SIZE = 10;
export default function ClientsManagement() {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cache = useRef(
    new Map<
      string,
      { data: AdminClient[]; total: number; totalPages: number }
    >(),
  );
  const [updating, setUpdating] = useState<string | null>(null);
  const load = useCallback(async () => {
    const key = JSON.stringify([page, search, status]);
    const cached = cache.current.get(key);
    if (cached) {
      setClients(cached.data);
      setTotal(cached.total);
      setTotalPages(cached.totalPages);
      setLoading(false);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await getAdminClients({
        page,
        limit: PAGE_SIZE,
        search,
        status,
      });
      const payload = {
        data: response.data ?? [],
        total: response.pagination.total,
        totalPages: Math.max(1, response.pagination.totalPages),
      };
      cache.current.set(key, payload);
      setClients(payload.data);
      setTotal(payload.total);
      setTotalPages(payload.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load clients.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Client accounts
          </h2>
          <p className="text-sm text-slate-500">{total} registered clients</p>
        </div>
        <button
          onClick={() => {
            cache.current.delete(JSON.stringify([page, search, status]));
            void load();
          }}
          disabled={loading}
          className="inline-flex h-10 items-center gap-2 self-start rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setSearch(searchInput.trim());
        }}
        className="mb-4 grid gap-3 sm:grid-cols-[1fr_190px_auto]"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, email or phone"
            className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-[#147d7e]"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="BLOCKED">Blocked</option>
        </select>
        <button className="h-11 rounded-xl bg-[#103f3d] px-5 text-sm font-semibold text-white">
          Search
        </button>
      </form>
      {error && (
        <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-sm text-slate-500"
                >
                  Loading clients…
                </td>
              </tr>
            ) : clients.length ? (
              clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">
                      {c.firstName} {c.lastName ?? ""}
                    </p>
                    <p className="text-xs text-slate-400">Client</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {c.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {c.phone || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : c.status === "BLOCKED" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={updating === c.id}
                      onClick={async () => {
                        const next: AdminClient["status"] =
                          c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

                        setUpdating(c.id);

                        try {
                          await updateAdminClientStatus(c.id, next);

                          const updated: AdminClient = {
                            ...c,
                            status: next,
                          };

                          setClients((rows) =>
                            rows.map((row) =>
                              row.id === c.id ? updated : row,
                            ),
                          );

                          cache.current.clear();
                        } catch (e) {
                          setError(
                            e instanceof Error
                              ? e.message
                              : "Unable to update client status",
                          );
                        } finally {
                          setUpdating(null);
                        }
                      }}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold ${c.status === "ACTIVE" ? "border border-amber-200 text-amber-700" : "border border-emerald-200 text-emerald-700"}`}
                    >
                      {updating === c.id
                        ? "Updating…"
                        : c.status === "ACTIVE"
                          ? "Set inactive"
                          : "Set active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center">
                  <Users className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    No clients found
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex h-9 items-center gap-1 rounded-lg border px-3 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex h-9 items-center gap-1 rounded-lg border px-3 disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
