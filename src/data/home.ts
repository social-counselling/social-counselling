export type CounsellingTypeId =
  | "teenagers"
  | "marriage"
  | "senior-citizens"
  | "individual"
  | "corporate";

export interface CounsellingType {
  id: CounsellingTypeId;
  title: string;
  subtitle: string;
  href: string;
}

export interface HeroBenefit {
  id: string;
  title: string;
  description: string;
}

export const heroData = {
  eyebrow: "Empathy • Support • Guidance",

  title: "Sometimes, all you need is",

  highlightedTitle: "just a better perspective.",

  description:
    "A safe space to be heard, understood, and supported through life's challenges.",

  primaryCta: {
    label: "Book a Session",
    href: "/book-session",
  },

  secondaryCta: {
    label: "Meet Our Counsellors",
    href: "/counsellors",
  },

  image: "/images/hero/home-hero.png",
};

export const counsellingTypes: CounsellingType[] = [
  {
    id: "teenagers",
    title: "Teenagers",
    subtitle: "Building confidence",
    href: "/services/teenagers-counselling",
  },

  {
    id: "marriage",
    title: "Marriage",
    subtitle: "Creating stronger bonds",
    href: "/services/marriage-counselling",
  },

  {
    id: "senior-citizens",
    title: "Senior Citizens",
    subtitle: "Transition & care",
    href: "/services/senior-citizens-counselling",
  },

  {
    id: "individual",
    title: "Individual",
    subtitle: "Clarity & growth",
    href: "/services/individual-counselling",
  },

  {
    id: "corporate",
    title: "Corporate",
    subtitle: "Workplace wellbeing",
    href: "/services/corporate-employee-counselling",
  },
];

export const heroBenefits: HeroBenefit[] = [
  {
    id: "listening",
    title: "A listening ear.",
    description:
      "A safe and judgement-free space to express yourself.",
  },

  {
    id: "thought",
    title: "A conscious thought.",
    description:
      "Understand your emotions and develop healthier perspectives.",
  },

  {
    id: "path",
    title: "A clear path forward.",
    description:
      "Practical guidance to help you move ahead with confidence.",
  },
];