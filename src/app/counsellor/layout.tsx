import CounsellorSidebar from "@/components/counsellor/CounsellorSidebar";
import CounsellorHeader from "@/components/counsellor/CounsellorHeader";

export default function CounsellorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CounsellorSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <CounsellorHeader />

        <main className="min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}