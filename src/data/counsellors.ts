export type CounsellorId =
  | "vikram-srivastava"
  | "dr-hemali-jariwala"
  | "kiranmai-patwari";

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

export const counsellorsData = [
  {
    id: "vikram-srivastava",
    name: "Vikram Srivastava",
    slug: "vikram-srivastava",
    credentials: ["Ex Army Officer", "Corporate Leader", "Social Advisor"],
    age: "49 yrs",
    languages: ["English", "Hindi"],
    geographicalCoverage:
      "Pan India. ESP in the northern and central parts of India",
    specializationAreas: [
      "Youth counselling",
      "Marriage counselling (Pre, Post, compatibility)",
      "Corporate employee counselling",
    ],
    mantra: "Resilience, dedication & hard work.",
    introduction: [
      "Vikram is passionate about giving counselling to people in need.",
      "Vikram establishes a quick connect with people and guides them about the path forward with great compassion and thoughtfulness.",
      "He relates to teenagers very well and is able to drive the right behaviors in them with ease such that it looks a win-win.",
      "Developing patience in people, right thinking, correcting povs and developing child into a great human being are his core strengths.",
      "Vikram has been counselling juvenile delinquents across child correctional facilities and has been well appreciated for the work.",
      "It started as a freelance activity, He now has about 20 yrs of experience in this field and pursues it passionately",
    ],
    image: "/images/counsellors/vikram-srivastava.png",
  },
  {
    id: "dr-hemali-jariwala",
    name: "Dr. Hemali Jariwala",
    slug: "dr-hemali-jariwala",
    credentials: [
      "Homeopathy Consultant",
      "Palliative Care Associate",
      "Spiritual Healer",
    ],
    languages: ["English", "Hindi", "Gujrati"],
    geographicalCoverage:
      "Pan India. ESP for the western parts like Mumbai and Gujrat",
    specializationAreas: [
      "Women’s post pregnancy counselling",
      "Lifestyle disorders",
      "Student counselling for anxiety, depression, examination stress, and emotional well-being",
      "Post separation trauma",
      "Overall mental health",
    ],
    introduction: [
      "With over 15 years of dedicated clinical experience, Dr. Hemali Jariwala is a compassionate and trusted Homoeopathy physician practicing across Mumbai and Gujrat. she has successfully treated patients across all age groups for a wide range of acute and chronic health conditions through individualized homoeopathic treatment plans. Her patient-centric approach emphasizes holistic healing by considering the physical, emotional, and psychological aspects of every individual.",
      "Additionally, she is associated with Palliative Care Services, where she provides supportive care to patients living with dementia, Alzheimer's disease, and other chronic debilitating conditions. Her work focuses on improving quality of life, symptom management, and providing compassionate support to both patients and their families.",
      "Dr. Jariwala is also actively involved in adolescent and mental wellness counselling, helping teenagers navigate personal and societal challenges such as anxiety, depression, examination stress, low self-esteem, emotional disturbances, peer pressure, society influence and behavorial concerns. She believes that timely counselling and empathetic guidance play a vital role in building emotional resilience and confidence among young individuals.",
      "A committed learner, Dr. Jariwala is actively associated with the HHF Homoeopathic Foundation, where she regularly participates in continuing medical education programs, clinical seminars, and academic discussions.",
    ],
    image: "/images/counsellors/dr-hemali-jariwala.png",
  },
  {
    id: "kiranmai-patwari",
    name: "Kiranmai Patwari",
    slug: "kiranmai-patwari",
    credentials: ["Corporate Professional", "Trained Counsellor"],
    age: "42 yrs",
    languages: ["English", "Hindi", "Telugu", "Kannada"],
    geographicalCoverage: "Pan India",
    specializationAreas: [
      "Family counselling",
      "Marriage counselling (pre, post, compatibility)",
      "Postpartum counselling",
    ],
    mantra: "Stay positive. Work hard. Spread happiness.",
    introduction: [
      "I am qualified and experienced in family and women's counselling. My path here was shaped by family counselling shows and first hand experience with women's issues in modern society. The ability to listen, understand, talk and convince brought me on this platform today. I believe that strength and perseverance create destiny.",
      "You can expect A safe, non-judgemental space to talk through family conflict, trauma, or the postpartum transition — with practical guidance drawn from diverse experience.",
    ],
    image: "/images/counsellors/kiranmai-patwari.png",
  },
] satisfies CounsellorData[];

export const counsellorBySlug = Object.fromEntries(
  counsellorsData.map((counsellor) => [counsellor.slug, counsellor]),
) as Record<string, CounsellorData>;

export function getCounsellorBySlug(slug: string) {
  return counsellorBySlug[slug];
}
