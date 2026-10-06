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
            <div key={step.id} className="flex flex-1 items-start">
              {/* Step */}
              <div className="flex w-full flex-col items-center">
                {/* Circle */}
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-full border-2
                    text-xs font-semibold
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "border-primary bg-primary text-white"
                        : isActive
                          ? "border-primary bg-white text-primary shadow-[0_0_0_4px_rgba(32,128,113,0.10)]"
                          : "border-slate-300 bg-white text-slate-500"
                    }
                  `}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-2 whitespace-nowrap
                    text-[11px] font-medium
                    lg:text-xs
                    ${
                      isActive
                        ? "font-semibold text-primary"
                        : isCompleted
                          ? "text-secondary"
                          : "text-slate-500"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={`
                    mt-[17px] h-[2px] flex-1
                    transition-colors duration-300
                    ${isCompleted ? "bg-primary" : "bg-slate-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
