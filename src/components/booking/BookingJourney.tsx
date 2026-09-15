import { Check, Leaf } from "lucide-react";

import { bookingSteps } from "@/data/booking";

interface BookingJourneyProps {
  currentStep: number;
}

export default function BookingJourney({
  currentStep,
}: BookingJourneyProps) {
  return (
    <aside className="rounded-[20px] border border-white/80 bg-white/90 p-5 shadow-[0_10px_35px_rgba(24,59,59,0.08)] backdrop-blur-md sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f2e5] text-primary">
          <Leaf className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-secondary">
            Your Booking Journey
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            A simple and guided process to make your experience smooth and
            stress-free.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {bookingSteps.map((step) => {
          const completed = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <div key={step.id} className="flex gap-3">
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full text-xs font-semibold
                  ${
                    completed
                      ? "bg-[#4b9b68] text-white"
                      : active
                        ? "bg-primary text-white shadow-[0_0_0_4px_rgba(32,128,113,0.12)]"
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

              <div className="min-w-0">
                <p
                  className={`
                    text-sm font-semibold
                    ${
                      active
                        ? "text-primary"
                        : "text-secondary"
                    }
                  `}
                >
                  {step.title}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Small quote */}
      <div className="mt-6 rounded-xl bg-[#eef7e9] p-4 text-center">
        <p className="font-serif text-sm italic leading-6 text-secondary">
          A more compassionate you leads to a brighter tomorrow.
        </p>
      </div>
    </aside>
  );
}