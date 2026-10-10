import { notFound } from "next/navigation";

import CounsellorProfilePage from "@/components/counsellors/CounsellorProfilePage";
import { getPublicCounsellorById } from "@/services/public/public-content.api";

export default async function CounsellorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const counsellor = await getPublicCounsellorById(slug);
  if (!counsellor) notFound();
  return <CounsellorProfilePage counsellor={counsellor} />;
}
