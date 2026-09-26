import SlotsManagement from "@/components/admin/slots/SlotsManagement";
import CounsellorAvailabilityManagement from "@/components/admin/slots/CounsellorAvailabilityManagement";

export default function AdminSlotsPage() {
  return (
    <div className="space-y-8 p-6">
      <SlotsManagement />

      <CounsellorAvailabilityManagement />
    </div>
  );
}
