export const contactData = {
  eyebrow: "We Are Here For You",
  title: "Contact Us",
  description:
    "Have a question, need guidance, or want to learn more about our services? We'd love to hear from you.",

  quickLinks: [
    { id: "call", title: "Call Us", subtitle: "We're here to help", href: "tel:+919876543210", icon: "phone" },
    { id: "email", title: "Email Us", subtitle: "Drop us a message", href: "mailto:support@socialcounselling.in", icon: "mail" },
    { id: "location", title: "Visit Us", subtitle: "We're just a step away", href: "#contact-information", icon: "location" },
  ],

  information: [
    { id: "phone", title: "Phone", value: "+91 98765 43210", detail: "Mon - Sat, 9:00 AM to 7:00 PM", icon: "phone" },
    { id: "email", title: "Email", value: "support@socialcounselling.in", detail: "We usually respond within 24 hours.", icon: "mail" },
    { id: "location", title: "Our Location", value: "New Delhi, India", detail: "Pan India Services Available", icon: "location" },
  ],

  message: {
    title: "Sometimes, all you need is just a better perspective.",
    subtitle: "Reach out today. We are here to listen.",
  },

  values: [
    { id: "confidential", title: "Confidential", description: "Your privacy is our priority.", icon: "lock" },
    { id: "compassionate", title: "Compassionate", description: "We listen with empathy.", icon: "heart" },
    { id: "accessible", title: "Accessible", description: "Support across India.", icon: "users" },
    { id: "meaningful", title: "Meaningful", description: "Together for a brighter tomorrow.", icon: "leaf" },
  ],
} as const;
