import Image from "next/image";

import Container from "@/components/common/Container";

import {
  counsellingHelpData,
  ourRoleData,
} from "@/data/home";

export default function CounsellingHelpSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-12
        sm:py-16
        lg:py-20
      "
    >
      {/* =====================================================
          TOP LEFT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-top-left7.png"
        alt=""
        width={255}
        height={245}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          w-[75px]
          opacity-40
          sm:w-[105px]
          md:w-[130px]
          lg:w-[160px]
          xl:w-[190px]
        "
      />

      {/* =====================================================
          TOP RIGHT BOTANICAL
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-top-right 3.png"
        alt=""
        width={240}
        height={225}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          w-[75px]
          opacity-35
          sm:w-[105px]
          md:w-[130px]
          lg:w-[160px]
          xl:w-[190px]
        "
      />

      <Container className="relative z-10">
        {/* ===================================================
            COUNSELLING HELP
            =================================================== */}

        <div
          className="
            grid
            items-center
            gap-8
            xl:grid-cols-[0.95fr_1.05fr]
            xl:gap-10
            2xl:gap-14
          "
        >
          {/* =================================================
              LEFT — CONTENT
              ================================================= */}

          <div
            className="
              mx-auto
              w-full
              max-w-[620px]
            "
          >
            {/* Heading */}

            <div className="text-center">
              <p
                className="
                  font-Unkempt
                  text-2xl
                  font-bold
                  tracking-[0.28em]
                  text-primary
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                {counsellingHelpData.eyebrow}
              </p>

              <h2
                className="
                  mx-auto
                  mt-3
                  max-w-[560px]
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-secondary
                  sm:text-3xl
                "
              >
                {counsellingHelpData.title}
              </h2>

              {/* Divider */}

              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-primary/20 sm:w-12" />

                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={140}
                  height={40}
                  aria-hidden="true"
                  className="
                    h-auto
                    w-[80px]
                    opacity-60
                    sm:w-[95px]
                  "
                />

                <span className="h-px w-8 bg-primary/20 sm:w-12" />
              </div>
            </div>

            {/* Introduction */}

            <p
              className="
                mt-6
                text-base
                leading-7
                text-slate-600
                sm:text-[17px]
                sm:leading-8
              "
            >
              {counsellingHelpData.introduction}
            </p>

            <p
              className="
                mt-3
                text-base
                font-medium
                leading-7
                text-secondary
                sm:text-[17px]
                sm:leading-8
              "
            >
              {counsellingHelpData.preparation}
            </p>

           
          </div>

          {/* =================================================
              RIGHT — IMAGE
              ================================================= */}

          <div
            className="
              relative
              flex
              w-full
              items-center
              justify-center
              xl:justify-end
            "
          >
            {/* Soft botanical panel */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[-10px]
                right-[-5px]
                h-[82%]
                w-[88%]
                rounded-[40px]
                bg-[#edf6ea]
                opacity-70
                sm:right-0
              "
            />

            {/* Small floating leaf */}

            <Image
              src="/images/home/introduction/flower1.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-2
                top-[12%]
                z-20
                hidden
                w-[75px]
                rotate-[-12deg]
                opacity-45
                xl:block
              "
            />

            {/* Image wrapper */}

            <div
              className="
                relative
                z-10
                w-full
                max-w-[560px]
                overflow-hidden
                rounded-[30px]
                border
                border-white
                bg-white
                shadow-[0_18px_50px_rgba(24,59,59,0.12)]
              "
            >
              <Image
                src="/images/home/social-counselling/social-counselling-scene1.png"
                alt="A counselling conversation beside a peaceful mountain lake"
                width={1536}
                height={1024}
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1279px) 90vw,
                  560px
                "
                className="
                  block
                  h-auto
                  w-full
                "
              />

              {/* Soft bottom fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-[65px]
                  bg-gradient-to-t
                  from-white
                  via-white/20
                  to-transparent
                  sm:h-[80px]
                "
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
            ===================================================== */}

        <div
          className="
            mx-auto
            my-9
            flex
            max-w-4xl
            items-center
            justify-center
            gap-4
            sm:my-11
          "
        >
          <span className="h-px flex-1 bg-primary/12" />

          <Image
            src="/images/home/introduction/horizontal_leaves1.png"
            alt=""
            width={140}
            height={40}
            aria-hidden="true"
            className="
              h-auto
              w-[75px]
              opacity-50
              sm:w-[85px]
            "
          />

          <span className="h-px flex-1 bg-primary/12" />
        </div>

        {/* =====================================================
            OUR ROLE
            ===================================================== */}

        <div
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          {/* Eyebrow */}

          <p
            className="
              font-Unkempt
              text-2xl
              font-bold
              tracking-[0.28em]
              text-primary
              sm:text-3xl
              lg:text-4xl
            "
          >
            {ourRoleData.eyebrow}
          </p>

          {/* Title */}

          <h2
            className="
              mx-auto
              mt-3
              max-w-3xl
              text-2xl
              font-semibold
              leading-tight
              tracking-tight
              text-secondary
              sm:text-3xl
              lg:text-4xl
            "
          >
            {ourRoleData.title}
          </h2>

          {/* Divider */}

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/20 sm:w-12" />

            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[80px]
                opacity-55
                sm:w-[95px]
              "
            />

            <span className="h-px w-8 bg-primary/20 sm:w-12" />
          </div>

          {/* Paragraphs */}

          <div
            className="
              mx-auto
              mt-6
              max-w-3xl
              space-y-4
              sm:mt-7
              sm:space-y-5
            "
          >
            {ourRoleData.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="
                  text-base
                  leading-7
                  text-slate-600
                  sm:text-lg
                  sm:leading-8
                "
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* =====================================================
          BOTTOM LEFT LEAVES
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-bottom-left1.png"
        alt=""
        width={220}
        height={290}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-0
          w-[75px]
          opacity-30
          sm:w-[105px]
          md:w-[130px]
          lg:w-[155px]
          xl:w-[185px]
        "
      />

      {/* =====================================================
          BOTTOM RIGHT LEAVES
          ===================================================== */}

      <Image
        src="/images/home/introduction/leaf-bottom-right1.png"
        alt=""
        width={285}
        height={270}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          z-0
          w-[85px]
          opacity-30
          sm:w-[115px]
          md:w-[140px]
          lg:w-[165px]
          xl:w-[195px]
        "
      />

      {/* =====================================================
          BOTTOM WAVE
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-[35px]
          overflow-hidden
          sm:h-[45px]
          lg:h-[55px]
        "
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-full"
        >
          <path
            fill="#E8F5E9"
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
  );
}