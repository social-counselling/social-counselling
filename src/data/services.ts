export type ServiceId =
  | "teenager-youth"
  | "student"
  | "pre-marriage"
  | "post-marriage"
  | "compatibility-assessment"
  | "couple"
  | "senior-citizens"
  | "women"
  | "corporate-employees"
  | "individual"
  | "other-social-norms"
  | "empathetic-listening";

export interface ServiceCardData {
  id: ServiceId;
  number: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

export const servicesPageData = {
  eyebrow: "Our Services",

  title: "Support for where you are in life.",

  description:
    "Social Counselling provides a supportive space to understand situations better, consider different perspectives and make more thoughtful choices.",

  services: [
    {
      id: "teenager-youth",
      number: "01",
      title: "Teenager / Youth Counselling",
      subtitle: "Maturity, responsibility and conscious thinking.",
      href: "/services/teenager-youth-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "student",
      number: "02",
      title: "Student Counselling",
      subtitle:
        "Confidence, motivation, clarity and preparedness to move forward.",
      href: "/services/student-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "pre-marriage",
      number: "03",
      title: "Pre-Marriage Counselling",
      subtitle: "Marriage Counselling",
      href: "/services/marriage-counselling/pre-marriage",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "post-marriage",
      number: "04",
      title: "Post-Marriage Counselling",
      subtitle: "Marriage Counselling",
      href: "/services/marriage-counselling/post-marriage",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "compatibility-assessment",
      number: "05",
      title: "Compatibility Assessment",
      subtitle: "Marriage Counselling",
      href: "/services/marriage-counselling/compatibility-assessment",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "couple",
      number: "06",
      title: "Couple Counselling",
      subtitle:
        "Greater clarity and understanding for the way forward.",
      href: "/services/couple-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "senior-citizens",
      number: "07",
      title: "Senior Citizens Counselling",
      subtitle:
        "Clarity, acceptance, purpose and continued engagement.",
      href: "/services/senior-citizens-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "women",
      number: "08",
      title: "Women's Counselling",
      subtitle:
        "A space to be heard, understood and encouraged to move forward.",
      href: "/services/womens-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "corporate-employees",
      number: "09",
      title: "Corporate Employee Counselling",
      subtitle:
        "Preparation, expectation setting, focus, responsibility and conscious thinking.",
      href: "/services/corporate-employee-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "individual",
      number: "10",
      title: "Counselling for Self (Individual Counselling)",
      subtitle:
        "Greater clarity, a different perspective and a constructive way forward.",
      href: "/services/individual-counselling",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "other-social-norms",
      number: "11",
      title: "Other Counselling on Social Norms",
      subtitle:
        "An open door when your concern does not fit neatly into a defined service.",
      href: "/services/other-counselling-social-norms",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },

    {
      id: "empathetic-listening",
      number: "12",
      title: "Empathetic Listening",
      subtitle:
        "Compassionate conversation, attentive hearing and meaningful human connection.",
      href: "/services/empathetic-listening",
      image:
        "/images/home/social-counselling/social-counselling-scene1.png",
    },
  ] satisfies ServiceCardData[],
};