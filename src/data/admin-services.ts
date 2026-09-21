import type { AdminService } from "@/types/admin-service";

export const adminServices: AdminService[] = [
  {
    id: "service-01",
    serviceNumber: "01",
    category: "Social Counselling",
    title: "Teenager / Youth Counselling",
    subtitle:
      "Maturity, responsibility and conscious thinking.",
    slug: "teenager-youth-counselling",

    heroImageUrl:
      "/images/services/Teen Counselling.png",
    imageUrl:
      "/images/services/Teen Counselling.png",

    content: {
      sections: [
        {
          id: "section-01",
          title: "Introduction",
          content: [
            "Teenage years are an important period of growth, change and exploration.",
          ],
          subSections: [],
        },
        {
          id: "section-02",
          title: "Why It Matters",
          content: [
            "This stage of life can shape confidence, responsibility and conscious thinking.",
          ],
          subSections: [],
        },
        {
          id: "section-03",
          title: "Challenges",
          content: [],
          subSections: [
            {
              id: "sub-01",
              title: "Academic Pressure",
              content: [
                "Academic expectations can sometimes create pressure and confusion.",
              ],
            },
          ],
        },
      ],
    },

    contentStatus: "READY",
    isPublished: true,
    isActive: true,
    sortOrder: 1,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-02",
    serviceNumber: "02",
    category: "Social Counselling",
    title: "Student Counselling",
    subtitle:
      "Confidence, motivation, clarity and preparedness to move forward.",
    slug: "student-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [
        {
          id: "section-01",
          title: "Introduction",
          content: [
            "Student counselling provides a supportive space for students to understand their concerns and move forward.",
          ],
          subSections: [],
        },
        {
          id: "section-02",
          title: "Challenges",
          content: [
            "Students may experience different academic, personal and social challenges.",
          ],
          subSections: [],
        },
      ],
    },

    contentStatus: "READY",
    isPublished: true,
    isActive: true,
    sortOrder: 2,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-03",
    serviceNumber: "03",
    category: "Social Counselling",
    title: "Pre-Marriage Counselling",
    subtitle: "Marriage Counselling",
    slug: "pre-marriage",

    heroImageUrl:
      "/images/services/Pre Marriage Counselling.png",
    imageUrl:
      "/images/services/Pre Marriage Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 3,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-04",
    serviceNumber: "04",
    category: "Social Counselling",
    title: "Post-Marriage Counselling",
    subtitle: "Marriage Counselling",
    slug: "post-marriage",

    heroImageUrl:
      "/images/services/Post Marriage Counselling.png",
    imageUrl:
      "/images/services/Post Marriage Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 4,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-05",
    serviceNumber: "05",
    category: "Social Counselling",
    title: "Compatibility Assessment",
    subtitle: "Marriage Counselling",
    slug: "compatibility-assessment",

    heroImageUrl:
      "/images/services/Compatibility.png",
    imageUrl:
      "/images/services/Compatibility.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 5,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-06",
    serviceNumber: "06",
    category: "Social Counselling",
    title: "Couple Counselling",
    subtitle:
      "Greater clarity and understanding for the way forward.",
    slug: "couple-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 6,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-07",
    serviceNumber: "07",
    category: "Social Counselling",
    title: "Senior Citizens Counselling",
    subtitle:
      "Clarity, acceptance, purpose and continued engagement.",
    slug: "senior-citizens-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 7,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-08",
    serviceNumber: "08",
    category: "Social Counselling",
    title: "Women's Counselling",
    subtitle:
      "A space to be heard, understood and encouraged to move forward.",
    slug: "womens-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 8,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-09",
    serviceNumber: "09",
    category: "Social Counselling",
    title: "Corporate Employee Counselling",
    subtitle:
      "Preparation, expectation setting, focus, responsibility and conscious thinking.",
    slug: "corporate-employee-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 9,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-10",
    serviceNumber: "10",
    category: "Social Counselling",
    title:
      "Counselling for Self (Individual Counselling)",
    subtitle:
      "Greater clarity, a different perspective and a constructive way forward.",
    slug: "individual-counselling",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 10,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-11",
    serviceNumber: "11",
    category: "Social Counselling",
    title: "Other Counselling on Social Norms",
    subtitle:
      "An open door when your concern does not fit neatly into a defined service.",
    slug: "other-counselling-social-norms",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 11,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },

  {
    id: "service-12",
    serviceNumber: "12",
    category: "Empathetic Listening",
    title: "Empathetic Listening",
    subtitle:
      "Compassionate conversation, attentive hearing and meaningful human connection.",
    slug: "empathetic-listening",

    heroImageUrl:
      "/images/services/Student Counselling.png",
    imageUrl:
      "/images/services/Student Counselling.png",

    content: {
      sections: [],
    },

    contentStatus: "WIP",
    isPublished: false,
    isActive: true,
    sortOrder: 12,

    createdAt: "2026-09-01",
    updatedAt: "2026-09-10",
  },
];