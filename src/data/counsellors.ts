export type CounsellorId = string;

export interface CounsellorData {
  id: CounsellorId;
  name: string;
  slug: string;
  credentials: string[];
  age?: string;
  languages: string[];
  geographicalCoverage: string;
  specializationAreas: string[];
  mantra?: string;
  introduction: string[];
  image?: string;
}
