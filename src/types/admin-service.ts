export interface ServiceSubSection {
  id: string;
  title: string;
  content: string[];
}

export interface ServiceSection {
  id: string;
  title: string;
  content: string[];
  subSections: ServiceSubSection[];
}

export interface ServiceContent {
  sections: ServiceSection[];
}

export type ServiceContentStatus =
  | "WIP"
  | "READY";

export interface AdminService {
  id: string;
  serviceNumber: string;
  category: string;
  title: string;
  subtitle: string;
  slug: string;

  heroImageUrl: string;
  imageUrl: string;

  content: ServiceContent;

  contentStatus: ServiceContentStatus;
  isPublished: boolean;
  isActive: boolean;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface ServiceFormData {
  serviceNumber: string;
  category: string;
  title: string;
  subtitle: string;
  slug: string;

  heroImageUrl: string;
  imageUrl: string;

  content: ServiceContent;

  contentStatus: ServiceContentStatus;
  isPublished: boolean;
  isActive: boolean;

  sortOrder: number;
}