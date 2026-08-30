export interface CounsellorSpecialization {
  id: string;
  title: string;
}

export interface Counsellor {
  id: string;

  slug: string;

  name: string;

  credentials: string;

  age?: number;

  experience?: string;

  languages: string[];

  geographicalCoverage: string;

  specializations: CounsellorSpecialization[];

  mantra?: string;

  shortBio: string;

  fullBio: string;

  profileImage?: string;

  isAvailableForBooking: boolean;
}