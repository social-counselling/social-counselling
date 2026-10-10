import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { privacySections } from "@/data/legalDocuments";

export const metadata = {
  title: "Privacy Policy | Social Counselling",
  description: "Learn how Social Counselling collects, uses, stores, protects and shares personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      eyebrow="Your privacy matters"
      description="Understand how Social Counselling handles personal information in connection with our website, bookings, counselling and Empathetic Listening services."
      updatedLabel="Version 1.0 · Effective date to be confirmed"
      sections={privacySections}
      relatedHref="/terms"
      relatedLabel="Read Terms & Conditions"
    />
  );
}
