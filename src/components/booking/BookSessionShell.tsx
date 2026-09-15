"use client";

import { useState } from "react";
import Image from "next/image";

import BookingProgress from "./BookingProgress";
import BookingJourney from "./BookingJourney";
import BookingNavigation from "./BookingNavigation";

import Step1Category from "./steps/Step1Category";

export default function BookSessionShell() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const canContinue =
    currentStep === 1
      ? Boolean(selectedCategory)
      : true;

  const handleNext = () => {
    if (!canContinue) return;

    if (currentStep < 8) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  return (
    <main className="relative overflow-hidden mt-22 bg-[#f4faef]">
      {/* =====================================================
          BOOKING HERO
      ===================================================== */}

      <section className="relative overflow-hidden">
        <div className="relative min-h-[300px] sm:min-h-[320px]">
          {/* Hero background */}
          <div className="absolute inset-0">
            
            <Image
              src="/images/services/services-hero-bg1.png"
              alt=""
              fill
                      priority
                      sizes="100vw"
              className="h-full w-full object-cover"
            />

            

            <div className="absolute inset-0 bg-white/35" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[300px] max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:min-h-[320px]">
            <p className="font-Unkempt text-2xl font-bold tracking-[0.28em] text-primary sm:text-3xl">
              Book A Session
            </p>

            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-secondary sm:text-5xl lg:text-[54px]">
              Take the first step towards a brighter tomorrow
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-secondary sm:text-base">
              <span>People</span>
              <span>•</span>
              <span>Conversations</span>
              <span>•</span>
              <span>Better Lives</span>
            </div>
          </div>
        </div>

     {/* =================================================
            HERO BOTTOM FADE
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-20
            h-36
            bg-gradient-to-t
            from-[#f4faef]
            via-[#f4faef]/65
            to-transparent
          "
          aria-hidden="true"
        />
          
           {/* =================================================
            WAVE
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            z-20
            h-[50px]
            overflow-hidden

            sm:h-[60px]

            lg:h-[70px]
          "
          aria-hidden="true"
        >

          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-full"
          >

            <path
              fill="#e1efdd"
              d="
                M0 65
                C120 95 210 112 340 102
                C470 92 535 55 665 65
                C795 75 850 112 970 105
                C1090 98 1145 65 1250 72
                C1340 78 1390 92 1440 88
                L1440 140
                L0 140
                Z
              "
            />

          </svg>

        </div>

      </section>

    

      {/* =====================================================
          MAIN BOOKING AREA
      ===================================================== */}

      <section className="relative px-4 py-10 sm:px-6 sm:py-12 lg:py-16">

            <Image
                   src="/images/services/section-leaf-leftFull.png"
                   alt=""
                   width={300}
                   height={260}
                   aria-hidden="true"
                   className="
                     pointer-events-none
                     absolute
                     left-0
                     top-0
                     z-30
                     w-[85px]
                     opacity-75
                     sm:w-[120px]
                     lg:w-[165px]
                     xl:w-[205px]
                   "
                 />
         
                  <Image
                   src="/images/services/section-leaf-rightFull.png"
                   alt=""
                   width={300}
                   height={260}
                   aria-hidden="true"
                   className="
                     pointer-events-none
                     absolute
                     right-0
                     top-0
                     z-30
                     w-[85px]
                     opacity-70
                     sm:w-[120px]
                     lg:w-[165px]
                     xl:w-[205px]
                   "
                 />
         



          {/* =====================================================
                                   PROGRESS
            ===================================================== */}

      <section className="relative z-20 -mt-1  border-primary/10 px-4 py-5 backdrop-blur-sm sm:py-">
        <BookingProgress currentStep={currentStep} />
      </section>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_370px] xl:gap-10">
          {/* Main step */}
          <div className="min-w-0">
            {currentStep === 1 && (
              <Step1Category
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            )}

            {/* Steps 2–8 will be added here */}
          </div>

          {/* Right journey */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingJourney currentStep={currentStep} />
          </div>
        </div>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl">
          <BookingNavigation
            currentStep={currentStep}
            canContinue={canContinue}
            onBack={handleBack}
            onNext={handleNext}
          />
        </div>
      </section>

      {/* =====================================================
          BOTTOM BOTANICAL AREA
      ===================================================== */}

      <div
        className="
          pointer-events-none
          h-16
          bg-[#e1efdd]
        "
        aria-hidden="true"
      >
        </div>
    </main>
  );
}