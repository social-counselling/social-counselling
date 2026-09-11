import Image from "next/image";

import Container from "@/components/common/Container";

import {
  counsellingHelpData,
  ourRoleData,
} from "@/data/home";

export default function CounsellingHelpSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">

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
          z-1
          w-[90px]
          opacity-45
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[210px]
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
          z-1
          w-[90px]
          opacity-40
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[205px]
        "
      />

      <Container className="relative z-10">

        {/* =====================================================
            COUNSELLING HELP
            ===================================================== */}

        <div className="grid  gap-8 lg:grid-cols-[0.75fr_1.25fr] mt-5 lg:gap-16">

          {/* Left content */}
          <div className="mt-6 lg:mt-12 ">

            <p
              className="
                text-2xl
                font-bold
                tracking-[0.32em]
                text-primary
                sm:text-2xl
                lg:text-4xl
                font-Unkempt
              "
            >
              {counsellingHelpData.eyebrow}
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-secondary sm:text-2xl lg:text-3xl">
              {counsellingHelpData.title}
            </h2>

            <div className="mt-5">
              <Image
                src="/images/home/introduction/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                aria-hidden="true"
                className="h-auto w-[95px] opacity-60"
              />
            </div>

            <p className="mt-6 text-base leading-7 text-slate-600">
              {counsellingHelpData.introduction}
            </p>

            <p className="mt-4 text-base font-medium leading-7 text-secondary">
              {counsellingHelpData.preparation}
            </p>

          </div>

          {/* Situations */}
          <div className="grid gap-4 sm:grid-cols-2">
            {counsellingHelpData.situations.map((item) => (
              <article
                key={item.id}
                className="
                  rounded-2xl
                  border
                  border-primary/10
                  bg-[#f7fcf8]
                  p-5
                  shadow-[0_8px_25px_rgba(24,59,59,0.05)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_12px_30px_rgba(24,59,59,0.08)]
                  sm:p-6
                "
              >
                <h3 className="text-lg font-semibold text-secondary">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

        </div>

        {/* =====================================================
            DIVIDER BETWEEN SECTIONS
            ===================================================== */}

        <div className="mx-auto my-10 flex max-w-5xl items-center justify-center gap-4 sm:my-12 lg:my-14">

          <span className="h-px flex-1 bg-primary/15" />

          <Image
            src="/images/home/introduction/horizontal_leaves1.png"
            alt=""
            width={140}
            height={40}
            aria-hidden="true"
            className="h-auto w-[85px] opacity-55"
          />

          <span className="h-px flex-1 bg-primary/15" />

        </div>

        {/* =====================================================
            OUR ROLE
            ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">

          <p className="
             text-2xl
                font-bold
                tracking-[0.32em]
                text-primary
                sm:text-2xl
                lg:text-4xl
                font-Unkempt">
            {ourRoleData.eyebrow}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-secondary sm:text-2xl lg:text-3xl">
            {ourRoleData.title}
          </h2>

          <div className="mx-auto mt-5 space-y-4 sm:mt-6 sm:space-y-5">

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
          z-1
          w-[90px]
          opacity-30
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[210px]
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
          z-1
          w-[105px]
          opacity-35
          sm:w-[135px]
          lg:w-[180px]
          xl:w-[220px]
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
          h-[45px]
          overflow-hidden
          sm:h-[55px]
          lg:h-[65px]
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