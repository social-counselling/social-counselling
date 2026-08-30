export type ServiceStatus = "READY" | "WIP";

export interface Service {
  id: string;

  slug: string;

  title: string;

  shortDescription: string;

  description?: string;

  status: ServiceStatus;

  image?: string;

  suitableFor?: string[];

  counsellorIds?: string[];

  bookingEnabled: boolean;
}