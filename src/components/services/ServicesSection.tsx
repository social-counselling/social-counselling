"use client";

import Image from "next/image";

import Container from "@/components/common/Container";
import { servicesPageData } from "@/data/services";

import ServiceGroup from "./ServiceGroup";
import SectionSideLeaves from "../common/SectionSideLeaves";

export default function ServicesSection() {
  return (
    <main className="relative overflow-hidden bg-[#fcfdf9]">

      {/* =====================================================
                             SERVICES HERO
          ===================================================== */}

      <section
        className="
          relative
          mt-22
          overflow-hidden
          min-h-[520px]
          sm:min-h-[550px]
          lg:min-h-[570px]
        "
      >

        {/* =================================================
            HERO BACKGROUND
            ================================================= */}

        <Image
          src="/images/services/services-hero-bg1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* =================================================
            SOFT WHITE OVERLAY
            ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-white/70
          "
          aria-hidden="true"
        />

        {/* =================================================
            CENTER SOFT WHITE GLOW
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-10
            mx-auto
            h-full
            max-w-5xl
            bg-white/30
            blur-3xl
          "
          aria-hidden="true"
        />

        <Container className="relative z-20">

          <div
            className="
              relative
              mx-auto
              flex
              min-h-[520px]
              max-w-5xl
              flex-col
              items-center
              justify-center
              px-4
              pb-20
              pt-28
              text-center

              sm:min-h-[550px]
              sm:pb-24

              lg:min-h-[570px]
              lg:pb-28
            "
          >

            {/* =================================================
                LEFT HANDWRITTEN DECORATION
                ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-[52%]
                z-10
                hidden
                -translate-y-1/2
                xl:block
                2xl:top-[50%]
              "
            >
              <Image
                src="/images/services/hero-text-left.png"
                alt=""
                width={220}
                height={220}
                aria-hidden="true"
                className="
                  h-auto
                  w-[120px]
                  opacity-65
                  xl:w-[135px]
                  2xl:w-[155px]
                "
              />
            </div>

            {/* =================================================
                RIGHT HANDWRITTEN DECORATION
                ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-[48%]
                z-10
                hidden
                -translate-y-1/2
                xl:block
                2xl:top-[50%]
              "
            >
              <Image
                src="/images/services/hero-text-right.png"
                alt=""
                width={220}
                height={220}
                aria-hidden="true"
                className="
                  h-auto
                  w-[120px]
                  opacity-65
                  xl:w-[135px]
                  2xl:w-[155px]
                "
              />
            </div>

            {/* =================================================
                EYEBROW
                ================================================= */}

            <p
              className="
                relative
                z-10
                font-Unkempt
                text-2xl
                font-bold
                tracking-[0.28em]
                text-[#168f91]
                sm:text-3xl
                lg:text-4xl
              "
            >
              {servicesPageData.eyebrow}
            </p>

            {/* =================================================
                TITLE
                ================================================= */}

            <h1
              className="
                relative
                z-10
                mx-auto
                mt-3
                max-w-[680px]
                font-serif
                text-4xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-[#123b69]

                sm:mt-4
                sm:max-w-[700px]
                sm:text-5xl

                lg:max-w-[720px]
                lg:text-[54px]
                lg:leading-[1.08]

                xl:max-w-[760px]
                xl:text-[60px]
              "
            >
              {servicesPageData.title}
            </h1>

            {/* =================================================
                DIVIDER
                ================================================= */}

            <div
              className="
                relative
                z-10
                mt-5
                flex
                justify-center
              "
            >
              <Image
                src="/images/services/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                aria-hidden="true"
                className="
                  h-auto
                  w-[85px]
                  opacity-80
                  sm:w-[100px]
                "
              />
            </div>

            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <p
              className="
                relative
                z-10
                mx-auto
                mt-5
                max-w-[680px]
                text-sm
                leading-6
                text-[#294766]

                sm:text-base
                sm:leading-7

                lg:text-[17px]
                lg:leading-7
              "
            >
              {servicesPageData.description}
            </p>

          </div>

        </Container>

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
              fill="#e8f3e6"
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
          SERVICE CARDS
          ===================================================== */}

      <section
        className="
          relative
          bg-[#f4faef]
          pb-14
          pt-0
          sm:pb-18
          lg:pb-20
        "
      >

        <SectionSideLeaves />

        {/* =================================================
            TOP LEFT DECORATION
            ================================================= */}

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

        {/* =================================================
            TOP RIGHT DECORATION
            ================================================= */}

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

        <Container className="relative z-10">

          {/* =================================================
              FIRST GROUP
              01–03

              CARDS LEFT
              CHARACTER RIGHT
              ================================================= */}

          <div
            className="
              mx-auto
              max-w-6xl
              pt-12
              sm:pt-16
              lg:pt-20
            "
          >
            <ServiceGroup
              services={servicesPageData.services.slice(0, 3)}
              imagePosition="right"
              imageSrc="/images/services/Mr Courage1.png"
              imageAlt="Social Counselling professional"
            />
          </div>

          {/* =================================================
              BETWEEN GROUPS DECORATION
              ================================================= */}

          <div
            className="
              mx-auto
              my-14
              flex
              max-w-5xl
              items-center
              justify-center
              gap-4
              sm:my-16
              lg:my-20
            "
          >
            <span className="h-px flex-1 bg-primary/10" />

            <Image
              src="/images/home/introduction/horizontal_leaves1.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[80px]
                opacity-50
                sm:w-[90px]
              "
            />

            <span className="h-px flex-1 bg-primary/10" />
          </div>

          {/* =================================================
              SECOND GROUP
              04–06

              CHARACTER LEFT
              CARDS RIGHT
              ================================================= */}

          <div className="mx-auto max-w-6xl">

            <ServiceGroup
              services={servicesPageData.services.slice(3, 6)}
              imagePosition="left"
              imageSrc="/images/services/Ms Resilience.png"
              imageAlt="Social Counselling professional"
            />

          </div>

          {/* =================================================
              BETWEEN GROUPS DECORATION
              ================================================= */}

          <div
            className="
              mx-auto
              my-14
              flex
              max-w-5xl
              items-center
              justify-center
              gap-4
              sm:my-16
              lg:my-20
            "
          >
            <span className="h-px flex-1 bg-primary/10" />

            <Image
              src="/images/home/introduction/horizontal_leaves1.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[80px]
                opacity-50
                sm:w-[90px]
              "
            />

            <span className="h-px flex-1 bg-primary/10" />
          </div>

          {/* =================================================
              THIRD GROUP
              07–09

              CARDS LEFT
              CHARACTER RIGHT
              ================================================= */}

          <div className="mx-auto max-w-6xl">

            <ServiceGroup
              services={servicesPageData.services.slice(6, 9)}
              imagePosition="right"
              imageSrc="/images/services/Mrs Hope.png"
              imageAlt="Social Counselling professional"
            />

          </div>


           {/* =================================================
              BETWEEN GROUPS DECORATION
              ================================================= */}

          <div
            className="
              mx-auto
              my-14
              flex
              max-w-5xl
              items-center
              justify-center
              gap-4
              sm:my-16
              lg:my-20
            "
          >
            <span className="h-px flex-1 bg-primary/10" />

            <Image
              src="/images/home/introduction/horizontal_leaves1.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[80px]
                opacity-50
                sm:w-[90px]
              "
            />

            <span className="h-px flex-1 bg-primary/10" />
          </div>

          {/* =================================================
              THIRD GROUP
              10–12

              CARDS LEFT
              CHARACTER RIGHT
              ================================================= */}

          <div className="mx-auto max-w-6xl">

            <ServiceGroup
              services={servicesPageData.services.slice(9, 12)}
              imagePosition="left"
              imageSrc="/images/services/Mr Gratitude.png"
              imageAlt="Social Counselling professional"
            />

          </div>

        </Container>

        {/* =================================================
            BOTTOM LEFT FLOWERS
            ================================================= */}

        <Image
          src="/images/vision-mission/flower-left.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-30
            w-[70px]
            opacity-70
            sm:w-[95px]
            md:w-[120px]
            lg:w-[150px]
            xl:w-[190px]
          "
        />

        {/* =================================================
            BOTTOM RIGHT FLOWERS
            ================================================= */}

        <Image
          src="/images/vision-mission/flower-right.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            z-30
            w-[75px]
            opacity-75
            sm:w-[100px]
            md:w-[125px]
            lg:w-[155px]
            xl:w-[195px]
          "
        />

        {/* =================================================
            BOTTOM WAVE
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            z-40
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
          BOTTOM CTA
          ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#edf6e9]
          py-14
          sm:py-18
          lg:py-20
        "
      >

        {/* =================================================
            LEFT BOTANICAL
            ================================================= */}

        <Image
          src="/images/services/bottom-left-leaves.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-0
            w-[80px]
            opacity-55
            sm:w-[115px]
            lg:w-[165px]
            xl:w-[205px]
          "
        />

        {/* =================================================
            RIGHT BOTANICAL
            ================================================= */}

        <Image
          src="/images/services/bottom-right-leaves.png"
          alt=""
          width={260}
          height={300}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            z-0
            w-[80px]
            opacity-55
            sm:w-[115px]
            lg:w-[165px]
            xl:w-[205px]
          "
        />

        <Container className="relative z-10">

          <div className="mx-auto max-w-3xl text-center">

            <p
              className="
                font-Unkempt
                text-xl
                font-bold
                tracking-[0.24em]
                text-[#168f91]
                sm:text-2xl
              "
            >
              A Different Perspective
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-semibold
                leading-tight
                text-[#123b69]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Sometimes, a different perspective
              can make all the difference.
            </h2>

            <div className="mt-6 flex justify-center">

              <a
                href="/book-session"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-600
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                "
              >
                Book a Session
                <span aria-hidden="true">→</span>
              </a>

            </div>

          </div>

        </Container>

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

    </main>
  );
}