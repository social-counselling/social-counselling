import { notFound } from "next/navigation";

import {
  counsellorsData,
  getCounsellorBySlug,
} from "@/data/counsellors";
import CounsellorProfilePage from "@/components/counsellors/CounsellorProfilePage";

export function generateStaticParams() {
  return counsellorsData.map((counsellor) => ({
    slug: counsellor.slug,
  }));
}

export default async function CounsellorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const counsellor = getCounsellorBySlug(slug);

  if (!counsellor) notFound();

  return <CounsellorProfilePage counsellor={counsellor} />;
}
