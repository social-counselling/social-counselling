"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface BookingNavigationProps {
  currentStep: number;
  canContinue: boolean;
  isLoading?: boolean;
  onBack: () => void;
  onNext: () => void | Promise<void>;
}

export default function BookingNavigation({
  currentStep,
  canContinue,
  isLoading = false,
  onBack,
  onNext,
}: BookingNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="
          inline-flex items-center gap-2
          rounded-lg border border-slate-300
          bg-white px-5 py-2.5
          text-sm font-semibold text-slate-700
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
        disabled={!canContinue || isLoading}
        className="
          inline-flex items-center gap-2
          rounded-lg bg-primary
          px-6 py-2.5
          text-sm font-semibold text-white
          shadow-sm transition
          hover:bg-primary/90
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        {isLoading
          ? "Processing..."
          : currentStep === 6
            ? "Pay"
            : currentStep === 8
              ? "Complete Booking"
              : "Next Step"}

        {!isLoading && <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
}
