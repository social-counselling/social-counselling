"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface BookingNavigationProps {
  currentStep: number;
  canContinue: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function BookingNavigation({
  currentStep,
  canContinue,
  onBack,
  onNext,
}: BookingNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-primary/10 pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="
          inline-flex items-center gap-2
          rounded-full
          border border-primary/30
          bg-white
          px-5 py-2.5
          text-sm font-semibold
          text-secondary
          transition
          hover:border-primary
          hover:text-primary
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className="
          inline-flex items-center gap-2
          rounded-full
          bg-primary
          px-6 py-2.5
          text-sm font-semibold
          text-white
          shadow-sm
          transition
          hover:bg-primary/90
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        {currentStep === 8 ? "Complete Booking" : "Next Step"}

        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}