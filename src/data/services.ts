import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "youth-counselling",
    slug: "youth-counselling",
    title: "Youth Counselling",
    shortDescription:
      "A supportive space to help young people navigate personal, emotional and social challenges with greater confidence and clarity.",
    description:
      "Youth counselling provides a safe and supportive environment for young people to talk openly, understand their challenges and develop healthier ways of thinking and responding.",
    status: "READY",
    bookingEnabled: true,
    suitableFor: [
      "Teenagers",
      "Young adults",
      "Personal challenges",
      "Emotional wellbeing",
      "Confidence building",
    ],
  },

  {
    id: "marriage-counselling",
    slug: "marriage-counselling",
    title: "Marriage Counselling",
    shortDescription:
      "Guidance for couples seeking better understanding, communication and stronger relationships.",
    description:
      "Marriage counselling creates a safe space for couples to understand different perspectives, communicate more openly and work through relationship challenges with thoughtful guidance.",
    status: "READY",
    bookingEnabled: true,
    suitableFor: [
      "Pre-marriage",
      "Marriage challenges",
      "Communication",
      "Relationship concerns",
      "Compatibility",
    ],
  },

  {
    id: "corporate-employee-counselling",
    slug: "corporate-employee-counselling",
    title: "Corporate Employee Counselling",
    shortDescription:
      "Confidential support to help employees navigate workplace challenges, personal pressures and professional wellbeing.",
    description:
      "Corporate employee counselling provides employees with a supportive space to discuss workplace and personal challenges and develop clearer, healthier ways forward.",
    status: "READY",
    bookingEnabled: true,
    suitableFor: [
      "Workplace stress",
      "Professional challenges",
      "Employee wellbeing",
      "Work-life balance",
      "Personal growth",
    ],
  },
];

export function getServiceBySlug(
  slug: string
): Service | undefined {
  return services.find(
    (service) => service.slug === slug
  );
}

export const readyServices = services.filter(
  (service) => service.status === "READY"
);