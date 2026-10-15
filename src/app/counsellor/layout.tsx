import CounsellorSidebar from "@/components/counsellor/CounsellorSidebar";

export default function CounsellorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CounsellorSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 overflow-y-auto pt-[70px] lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
