import { Check } from "lucide-react";

import { bookingSteps } from "@/data/booking";

interface BookingProgressProps {
  currentStep: number;
}

export default function BookingProgress({
  currentStep,
}: BookingProgressProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="mx-auto flex min-w-[560px] max-w-4xl items-start">
        {bookingSteps.map((step, index) => {
          const completed = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connecting line */}
              {index !== bookingSteps.length - 1 && (
                <div
                  className={`
                    absolute
                    left-1/2
                    top-[16px]
                    h-px
                    w-full
                    ${
                      completed
                        ? "bg-primary"
                        : "bg-slate-300"
                    }
                  `}
                />
              )}

              {/* Number */}
              <div
                className={`
                  relative z-10
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  text-xs font-semibold
                  transition-all duration-300
                  ${
                    completed
                      ? "bg-primary text-white"
                      : active
                        ? "bg-primary text-white shadow-[0_0_0_5px_rgba(32,128,113,0.12)]"
                        : "bg-slate-100 text-slate-600"
                  }
                `}
              >
                {completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>

              {/* Label */}
              <p
                className={`
                  mt-3
                  max-w-[90px]
                  text-center
                  text-[11px]
                  leading-tight
                  ${
                    active || completed
                      ? "font-semibold text-secondary"
                      : "text-slate-500"
                  }
                `}
              >
                {step.shortTitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}