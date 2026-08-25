export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  color: "teal" | "purple" | "orange" | "blue" | "green";
}

export const services: Service[] = [
  {
    id: "service_001",
    slug: "teenagers-counselling",
    title: "Teenagers Counselling",
    shortDescription:
      "Building confidence and nurturing values.",
    description:
      "Support for teenagers navigating academic pressure, relationships, identity, confidence, emotions, and life transitions.",
    icon: "users",
    image: "/images/services/teenagers.jpg",
    color: "teal",
  },

  {
    id: "service_002",
    slug: "marriage-counselling",
    title: "Marriage Counselling",
    shortDescription:
      "Understanding and creating stronger bonds.",
    description:
      "A supportive space for couples to improve communication, understand each other, resolve conflicts, and strengthen their relationship.",
    icon: "heart-handshake",
    image: "/images/services/marriage.jpg",
    color: "purple",
  },

  {
    id: "service_003",
    slug: "senior-citizens-counselling",
    title: "Senior Citizens Counselling",
    shortDescription:
      "Transition, relationship and care.",
    description:
      "Compassionate counselling focused on emotional wellbeing, life transitions, relationships, loneliness, and adapting to change.",
    icon: "heart",
    image: "/images/services/seniors.jpg",
    color: "orange",
  },

  {
    id: "service_004",
    slug: "individual-counselling",
    title: "Individual Counselling",
    shortDescription:
      "Guidance to the right path with clarity.",
    description:
      "One-to-one counselling for personal growth, emotional challenges, relationships, stress, confidence, and everyday life concerns.",
    icon: "user",
    image: "/images/services/individual.jpg",
    color: "blue",
  },

  {
    id: "service_005",
    slug: "corporate-employee-counselling",
    title: "Corporate Employee Counselling",
    shortDescription:
      "Navigating workplace challenges.",
    description:
      "Professional emotional wellbeing support that helps employees manage workplace stress, relationships, burnout, and personal challenges.",
    icon: "briefcase",
    image: "/images/services/corporate.jpg",
    color: "green",
  },
];