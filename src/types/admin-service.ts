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

export interface AdminService {
  serviceId: number;
  category: string;
  title: string;
  subtitle: string | null;
  slug: string | null;

  heroImageUrl: string | null;
  imageUrl: string | null;

  content: ServiceContent | null;

  isActive: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface ServiceFormData {
  category: string;
  title: string;
  subtitle: string;
  slug: string;

  heroImageUrl: string;
  imageUrl: string;

  content: ServiceContent;

  isActive: boolean;
  sortOrder: number;
}
