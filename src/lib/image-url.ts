import { API_URL } from "@/lib/api";

/** Resolve backend-uploaded relative image paths while preserving existing frontend public paths and absolute URLs. */
export function resolveImageUrl(path?: string | null): string {
  if (!path) return "";
  const normalized = path.replace(/\\/g, "/");
  if (/^https?:\/\//i.test(normalized) || normalized.startsWith("data:"))
    return normalized;
  if (normalized.startsWith("/uploads/"))
    return `${API_URL.replace(/\/$/, "")}${normalized}`;
  return normalized;
}
