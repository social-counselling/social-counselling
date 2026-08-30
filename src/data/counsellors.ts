import type { Counsellor } from "@/types/counsellor";

export const counsellors: Counsellor[] = [
  {
    id: "dr-hemali-jariwala",

    slug: "dr-hemali-jariwala",

    name: "Dr. Hemali Jariwala",

    credentials:
      "Homeopathy Consultant / Palliative Care Associate / Spiritual Healer",

    experience: "15+ years of dedicated clinical experience",

    languages: [
      "English",
      "Hindi",
      "Gujarati",
    ],

    geographicalCoverage:
      "Pan India, especially the western parts like Mumbai and Gujarat",

    specializations: [
      {
        id: "women-post-pregnancy",
        title: "Women's Post-Pregnancy Counselling",
      },
      {
        id: "lifestyle-disorders",
        title: "Lifestyle Disorders",
      },
      {
        id: "student-counselling",
        title: "Student Counselling",
      },
      {
        id: "post-separation-trauma",
        title: "Post-Separation Trauma",
      },
      {
        id: "mental-health",
        title: "Overall Mental Health",
      },
    ],

    shortBio:
      "A compassionate and trusted practitioner with extensive clinical experience and a holistic approach that considers physical, emotional and psychological wellbeing.",

    fullBio:
      "Dr. Hemali Jariwala has over 15 years of dedicated clinical experience. Her work includes individualized homoeopathic treatment, palliative care support and adolescent and mental wellness counselling. She works with people across age groups and focuses on compassionate, holistic support.",

    mantra:
      undefined,

    profileImage:
      undefined,

    isAvailableForBooking: true,
  },

  {
    id: "kiranmai-patwari",

    slug: "kiranmai-patwari",

    name: "Kiranmai Patwari",

    credentials:
      "Corporate Professional / Trained Counsellor",

    age: 42,

    languages: [
      "English",
      "Hindi",
      "Telugu",
      "Kannada",
    ],

    geographicalCoverage:
      "Pan India",

    specializations: [
      {
        id: "family-counselling",
        title: "Family Counselling",
      },
      {
        id: "marriage-counselling",
        title: "Marriage Counselling",
      },
      {
        id: "postpartum-counselling",
        title: "Postpartum Counselling",
      },
    ],

    shortBio:
      "A trained counsellor focused on family and women's counselling, with experience supporting people through family conflict, relationship concerns, trauma and postpartum transition.",

    fullBio:
      "Kiranmai Patwari is a corporate professional and trained counsellor with experience in family and women's counselling. Her path into counselling was shaped by family counselling shows and firsthand experience with women's issues in modern society. She emphasizes listening, understanding, communication and practical guidance.",

    mantra:
      "Stay positive. Work hard. Spread happiness.",

    profileImage:
      undefined,

    isAvailableForBooking: true,
  },

  {
    id: "vikram-srivastava",

    slug: "vikram-srivastava",

    name: "Vikram Srivastava",

    credentials:
      "Ex-Army Officer / Corporate Leader",

    age: 49,

    experience:
      "About 20 years of counselling experience",

    languages: [
      "English",
      "Hindi",
    ],

    geographicalCoverage:
      "Pan India, especially the northern and central parts of India",

    specializations: [
      {
        id: "youth-counselling",
        title: "Youth Counselling",
      },
      {
        id: "marriage-counselling",
        title: "Marriage Counselling",
      },
      {
        id: "corporate-employee-counselling",
        title: "Corporate Employee Counselling",
      },
    ],

    shortBio:
      "An experienced counsellor known for building a quick connection with people and helping them identify a thoughtful and practical path forward.",

    fullBio:
      "Vikram Srivastava is an Ex-Army Officer and Corporate Leader who is passionate about counselling people in need. He is described as being able to connect quickly with people and guide them with compassion and thoughtfulness. His experience includes youth counselling, marriage counselling, corporate employee counselling and work with juvenile correctional facilities.",

    mantra:
      "Stay positive. Work hard. Spread happiness.",

    profileImage:
      undefined,

    isAvailableForBooking: true,
  },
];

export function getCounsellorBySlug(
  slug: string
): Counsellor | undefined {
  return counsellors.find(
    (counsellor) => counsellor.slug === slug
  );
}