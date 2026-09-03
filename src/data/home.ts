import type { CTA } from "@/types/common";

/* =========================================================
   COUNSELLING TYPES
   These are the 5 categories shown on the Hero.
   ========================================================= */

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

/* =========================================================
   HERO
   ========================================================= */

export const heroData = {
  image: "/images/hero/Home_page1_hero.png",

  primaryCta: {
    label: "Book a Session",
    href: "/book-session",
  },

  secondaryCta: {
    label: "Meet Our Counsellors",
    href: "/counsellors",
  },
};

/* =========================================================
   FIVE COUNSELLING TYPES
   ========================================================= */

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



/* =========================================================
   MARRIAGE COUNSELLING TYPES
   ========================================================= */

export const marriageServices = [
  {
    id: "pre-marriage",
    title: "Pre-marriage Counselling",
    href: "/services/pre-marriage-counselling",
  },

  {
    id: "post-marriage",
    title: "Post-marriage Counselling",
    href: "/services/post-marriage-counselling",
  },

  {
    id: "compatibility",
    title: "Compatibility Assessment/Check",
    href: "/services/compatibility-assessment",
  },
];
/* =========================================================
   HOME INTRODUCTION
   ========================================================= */

export const homeIntroduction = {
  eyebrow: "Why Social Counselling",

  title:
    "Sometimes, all we need is someone to guide us towards the right path.",

  paragraphs: [
    "Life can sometimes leave us unsure, emotionally overwhelmed, perplexed or indecisive about the right course of action—whether for ourselves or for someone we care about.",

    "We all undergo situations in life wherein we feel disappointment, isolation, indecisiveness, frustration and dismay.",

    "While we all have family and friends to talk to and seek advice from, their opinions can sometimes be influenced by their own experiences, emotions, relationships or perspectives.",

    "At such times, we may simply need a trusted second opinion—an independent and constructive perspective that looks beyond individual viewpoints and takes into account the broader social and emotional circumstances of the situation.",
  ],
};

/* =========================================================
   SOCIAL COUNSELLING
   ========================================================= */

export const socialCounsellingData = {
  eyebrow: "Social Counselling",

  title:
    "Someone who can listen, understand, reflect, mentor and guide.",

  paragraphs: [
    "That is where Social Counselling comes in.",

    "Social Counselling provides a supportive space where you can openly discuss a concern, situation or dilemma and gain a fresh perspective, either for you or even for your loved ones.",

    "Our Social Counsellors seek to understand the circumstances before offering guidance. They listen with empathy, ask the right questions, consider different perspectives, draw upon experience and wisdom, and help you reflect upon the choices available to you and their possible consequences via conscious thinking.",
  ],
};

/* =========================================================
   THREE FUNDAMENTAL PRINCIPLES
   ========================================================= */

export const principlesData = {
  eyebrow: "Our Approach",

  title:
    "Our approach is built around three fundamental principles.",

  principles: [
    {
      id: "empathy",
      title: "Empathy",
      description:
        "We listen with empathy and seek to understand the circumstances before offering guidance.",
    },

    {
      id: "support",
      title: "Support",
      description:
        "We provide a supportive space where you can openly discuss a concern, situation or dilemma.",
    },

    {
      id: "guidance",
      title: "Guidance",
      description:
        "We help you reflect upon the choices available to you and their possible consequences via conscious thinking.",
    },
  ],
};

/* =========================================================
   EVERY PERSON IS DIFFERENT
   ========================================================= */

export const individualityData = {
  eyebrow: "Every Person Is Different",

  title:
    "There is therefore no one-size-fits-all answer.",

  description:
    "We believe that every person and every situation is different. The nature and extent of guidance will depend upon the individual, the circumstances, their understanding and their willingness to reflect and act.",
};

/* =========================================================
   WHEN COUNSELLING CAN HELP
   ========================================================= */

export const counsellingHelpData = {
  eyebrow: "When Social Counselling Can Help",

  title:
    "Support for where you are in life.",

  introduction:
    "Social Counselling can be helpful when you are already facing a difficulty—whether involving yourself, your family, relationships or an important life decision.",

  preparation:
    "It can also help you prepare for what lies ahead.",

  situations: [
    {
      id: "before-marriage",
      title: "Before Marriage",
      description:
        "Understanding relationships before marriage.",
    },

    {
      id: "parenting",
      title: "Parenting",
      description:
        "Navigating the challenges of parenting.",
    },

    {
      id: "teenagers",
      title: "Teenagers",
      description:
        "Helping teenagers develop maturity and perspective.",
    },

    {
      id: "family",
      title: "Family Relationships",
      description:
        "Strengthening family relationships.",
    },

    {
      id: "later-life",
      title: "Later Stages of Life",
      description:
        "Finding purpose and continued relevance through later stages of life.",
    },
  ],
};

/* =========================================================
   OUR ROLE
   ========================================================= */

export const ourRoleData = {
  eyebrow: "Our Role",

  title:
    "Our role is not to make decisions on your behalf.",

  paragraphs: [
    "Nor do we claim to have a ready-made answer for every situation.",

    "Our endeavour is to help you understand better, think more clearly, consider the wider picture and make more informed and thoughtful choices.",
  ],
};

/* =========================================================
   DIFFERENT PERSPECTIVE
   ========================================================= */

export const perspectiveData = {
  eyebrow: "A Different Perspective",

  title:
    "Because sometimes, a different perspective can make all the difference.",
};

/* =========================================================
   LARGER PURPOSE
   ========================================================= */

export const largerPurposeData = {
  eyebrow: "A Larger Purpose",

  title:
    "Beyond an individual concern, we believe there is a larger purpose.",

  description:
    "Better understanding can lead to better choices. Better choices can lead to healthier relationships. Healthier relationships can lead to stronger families. And stronger families can contribute to a healthier society and create an excellent ecosystem.",

  journey: [
    {
      id: "understanding",
      title: "Better understanding",
    },

    {
      id: "choices",
      title: "Better choices",
    },

    {
      id: "relationships",
      title: "Healthier relationships",
    },

    {
      id: "families",
      title: "Stronger families",
    },

    {
      id: "society",
      title: "Healthier society",
    },
  ],
};

/* =========================================================
   FINAL CTA
   ========================================================= */

export const homeClosingData = {
  title: "Social Counselling",

  tagline: "Empathy. Support. Guidance.",

  description:
    "Because sometimes, a different perspective can make all the difference.",

  button: {
    label: "Book a Session",
    href: "/book-session",
  } satisfies CTA,
};