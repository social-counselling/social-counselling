import CounsellorForm from "@/components/admin/counsellors/CounsellorForm";

interface NewCounsellorPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function NewCounsellorPage({
  searchParams,
}: NewCounsellorPageProps) {
  const params = await searchParams;

  return (
    <CounsellorForm
      counsellorId={params.id}
    />
  );
}