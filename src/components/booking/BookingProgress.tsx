import { Check } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Category" },
  { id: 2, label: "Service" },
  { id: 3, label: "Counsellor" },
  { id: 4, label: "Calendar" },
  { id: 5, label: "Inputs" },
  { id: 6, label: "Consent" },
  { id: 7, label: "Confirm" },
  { id: 8, label: "Invite" },
];

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative flex min-w-0 flex-1 flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "border-primary bg-primary text-white"
                    : isActive
                      ? "border-primary bg-white text-primary shadow-[0_0_0_4px_rgba(32,128,113,0.10)]"
                      : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.id}
              </div>

              {!isLast && (
                <div className="absolute left-[calc(50%+14px)] top-[12px] z-0 h-[3px] w-[calc(100%-28px)] overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                  <span className={`absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-500 ease-out ${isCompleted ? "w-full" : "w-0"}`} />
                </div>
              )}

              <span className={`mt-1.5 whitespace-nowrap text-[9px] font-medium sm:text-[10px] lg:text-[11px] ${isActive ? "font-semibold text-primary" : isCompleted ? "text-secondary" : "text-slate-500"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
