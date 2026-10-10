import { API_URL } from "@/lib/api";
import type { ServiceCardData } from "@/data/services";
import type { ServiceDetailData, StructuredServiceContent } from "@/data/service-details";
import type { CounsellorData } from "@/data/counsellors";

const API_BASE_URL = API_URL.replace(/\/+$/, "");

type ApiService = {
  serviceId: number;
  title: string;
  subtitle?: string | null;
  slug: string;
  category?: string;
  content?: unknown;
  heroImageUrl?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
};

type ApiCounsellor = {
  id: number;
  credentials?: unknown;
  bio?: string | null;
  mantra?: string | null;
  coverage?: string | null;
  experienceYears?: number | null;
  experienceText?: string | null;
  specializations?: unknown;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    profileImageUrl?: string | null;
    gender?: string | null;
  } | null;
  languages?: Array<{ id?: string; name?: string; code?: string | null }>;
};

async function getPublicJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Public API request failed (${response.status}): ${path}`);
  }

  return (await response.json()) as T;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string" || typeof item === "number") return String(item);
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return asString(record.name ?? record.title ?? record.label ?? record.value);
      }
      return "";
    }).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) return asStringArray(parsed);
    } catch {
      // A plain string is a valid single value.
    }
    return [value];
  }

  return [];
}

function normalizeImage(value?: string | null): string {
  if (!value) return "";
  const raw = value.replace(/\\/g, "/").trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const normalized = raw.replace(/\/{2,}/g, "/");
  if (normalized.startsWith("/")) return normalized;
  return `/${normalized}`;
}

function contentToText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(contentToText).filter(Boolean).join("\n\n");
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const preferredKeys = ["content", "body", "text", "description", "sections", "items", "paragraphs"];
    const preferred = preferredKeys.filter((key) => key in record);
    if (preferred.length) {
      return preferred.map((key) => {
        const child = record[key];
        const heading = (typeof record.title === "string" && key !== "content") ? `**${record.title}**\n\n` : "";
        return `${heading}${contentToText(child)}`;
      }).filter(Boolean).join("\n\n");
    }
    return Object.entries(record).map(([key, child]) => {
      const heading = key.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      const text = contentToText(child);
      return text ? `**${heading}**\n\n${text}` : "";
    }).filter(Boolean).join("\n\n");
  }
  return "";
}

function mapServiceCard(service: ApiService, index: number): ServiceCardData {
  return {
    id: service.slug,
    number: String(index + 1).padStart(2, "0"),
    title: service.title,
    subtitle: service.subtitle ?? "",
    href: `/services/${service.slug}`,
    image: normalizeImage(service.imageUrl || service.heroImageUrl) || "/images/services/Pre Marriage Counselling.png",
  };
}

function isStructuredServiceContent(value: unknown): value is StructuredServiceContent {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return Array.isArray(record.sections);
}

function mapServiceDetail(service: ApiService): ServiceDetailData {
  const content = isStructuredServiceContent(service.content)
    ? service.content
    : contentToText(service.content) || service.subtitle || service.title;

  return {
    slug: service.slug,
    title: service.title,
    subtitle: service.subtitle ?? "",
    image: normalizeImage(service.heroImageUrl || service.imageUrl) || "/images/services/Pre Marriage Counselling.png",
    content,
  };
}

function mapCounsellor(counsellor: ApiCounsellor): CounsellorData {
  const user = counsellor.user ?? {};
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || "Counsellor";
  const bio = counsellor.bio?.trim() ?? "";
  return {
    id: String(counsellor.id),
    slug: String(counsellor.id),
    name,
    credentials: asStringArray(counsellor.credentials),
    languages: (counsellor.languages ?? []).map((language) => language.name ?? "").filter(Boolean),
    geographicalCoverage: counsellor.coverage?.trim() || "Available online",
    specializationAreas: asStringArray(counsellor.specializations),
    mantra: counsellor.mantra ?? undefined,
    introduction: bio ? bio.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean) : [],
    image: normalizeImage(user.profileImageUrl) || undefined,
  };
}

export async function getPublicServices(): Promise<ServiceCardData[]> {
  const services = await getPublicJson<ApiService[]>("/services");
  return services.map(mapServiceCard);
}

export async function getPublicServiceBySlug(slug: string): Promise<ServiceDetailData | null> {
  try {
    const service = await getPublicJson<ApiService>(`/services/${encodeURIComponent(slug)}`);
    return mapServiceDetail(service);
  } catch {
    return null;
  }
}

export async function getPublicServiceDetails(): Promise<ServiceDetailData[]> {
  const services = await getPublicJson<ApiService[]>("/services");
  return services.map(mapServiceDetail);
}

export async function getPublicCounsellors(): Promise<CounsellorData[]> {
  const counsellors = await getPublicJson<ApiCounsellor[]>("/counsellors");
  return counsellors.map(mapCounsellor);
}

export async function getPublicCounsellorById(id: string): Promise<CounsellorData | null> {
  if (!/^\d+$/.test(id)) return null;
  try {
    const counsellor = await getPublicJson<ApiCounsellor>(`/counsellors/${encodeURIComponent(id)}`);
    return mapCounsellor(counsellor);
  } catch {
    return null;
  }
}
