import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { termsSections } from "@/data/legalDocuments";

export const metadata = {
  title: "Client Terms & Conditions | Social Counselling",
  description: "Read the Client Terms & Conditions for Social Counselling and Empathetic Listening services.",
};

export default function TermsPage() {
  return (
    <LegalDocumentPage
      title="Client Terms & Conditions"
      eyebrow="Client information"
      description="Please review the terms that govern your use of Social Counselling and Empathetic Listening services."
      updatedLabel="Final · August 2026 · Version 1.0"
      sections={termsSections}
      relatedHref="/privacy-policy"
      relatedLabel="Read Privacy Policy"
    />
  );
}
