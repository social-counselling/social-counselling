export interface Counsellor {
  id: string;
  slug: string;
  name: string;
  designation: string;
  image: string;
  experience: number;
  rating: number;
  reviewCount: number;
  specializations: string[];
  languages: string[];
  sessionPrice: number;
  isAvailable: boolean;
}

export const counsellors: Counsellor[] = [
  {
    id: "counsellor_001",
    slug: "ananya-sharma",
    name: "Dr. Ananya Sharma",
    designation: "Clinical Psychologist",
    image: "/images/counsellors/ananya-sharma.jpg",
    experience: 8,
    rating: 4.9,
    reviewCount: 126,
    specializations: [
      "Individual Counselling",
      "Relationships",
      "Stress Management",
    ],
    languages: ["English", "Hindi"],
    sessionPrice: 1500,
    isAvailable: true,
  },

  {
    id: "counsellor_002",
    slug: "rahul-mehta",
    name: "Dr. Rahul Mehta",
    designation: "Counselling Psychologist",
    image: "/images/counsellors/rahul-mehta.jpg",
    experience: 10,
    rating: 4.8,
    reviewCount: 98,
    specializations: [
      "Marriage Counselling",
      "Family Counselling",
      "Life Transitions",
    ],
    languages: ["English", "Hindi"],
    sessionPrice: 1800,
    isAvailable: true,
  },

  {
    id: "counsellor_003",
    slug: "meera-kapoor",
    name: "Dr. Meera Kapoor",
    designation: "Senior Counselling Specialist",
    image: "/images/counsellors/meera-kapoor.jpg",
    experience: 12,
    rating: 4.9,
    reviewCount: 154,
    specializations: [
      "Senior Citizens",
      "Anxiety Management",
      "Emotional Wellbeing",
    ],
    languages: ["English", "Hindi"],
    sessionPrice: 2000,
    isAvailable: false,
  },
];