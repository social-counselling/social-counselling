export type BookingStep = {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
};

export const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: "Select Service Category",
    shortTitle: "Service Category",
    description:
      "Choose between Social Counselling or Empathetic Listening.",
  },
  {
    id: 2,
    title: "Select Service",
    shortTitle: "Select Service",
    description:
      "Choose the specific service that best matches your needs.",
  },
  {
    id: 3,
    title: "Select Counsellor / Listener",
    shortTitle: "Select Counsellor",
    description:
      "Choose from available counsellors or empathetic listeners.",
  },
  {
    id: 4,
    title: "Calendar Booking",
    shortTitle: "Calendar Booking",
    description:
      "Select your preferred date and available time.",
  },
  {
    id: 5,
    title: "Booking Inputs",
    shortTitle: "Booking Inputs",
    description:
      "Provide the required client and counselee information.",
  },
  {
    id: 6,
    title: "Client Consent & Payment",
    shortTitle: "Consent & Payment",
    description:
      "Review the details, provide consent and complete payment.",
  },
  {
    id: 7,
    title: "Booking Confirmation",
    shortTitle: "Confirmation",
    description:
      "Receive confirmation, invoice and calendar communication.",
  },
  {
    id: 8,
    title: "Invite Acceptance by Client",
    shortTitle: "Invite Acceptance",
    description:
      "Complete the final mandatory step through your email.",
  },
];

export const bookingCategories = [
  {
    id: "social-counselling",
    title: "Social Counselling",
    description:
      "Professional guidance for life’s challenges, relationships, and personal growth.",
    points: [
      "12 specialised services",
      "Certified counsellors",
      "Personalised support",
      "Confidential & safe space",
    ],
    image: "/images/booking/social-counselling1.png",
  },
  {
    id: "empathetic-listening",
    title: "Empathetic Listening",
    description:
      "A safe space to share, be heard and feel supported.",
    points: [
      "One-to-one listening support",
      "Non-judgemental space",
      "Trained empathetic listeners",
      "Human connection that heals",
    ],
    image: "/images/booking/empathetic-listening1.png",
  },
];