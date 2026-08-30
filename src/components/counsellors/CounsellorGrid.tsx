import type { Counsellor } from "@/types/counsellor";

import CounsellorCard from "./CounsellorCard";

interface CounsellorGridProps {
  counsellors: Counsellor[];
}

export default function CounsellorGrid({
  counsellors,
}: CounsellorGridProps) {
  if (counsellors.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-background-soft
          p-8
          text-center
        "
      >
        <p className="text-sm text-text-secondary">
          No counsellors are currently available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {counsellors.map((counsellor) => (
        <CounsellorCard
          key={counsellor.id}
          counsellor={counsellor}
        />
      ))}
    </div>
  );
}