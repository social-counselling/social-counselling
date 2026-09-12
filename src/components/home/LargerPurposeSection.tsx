import Image from "next/image";
import { IoArrowRedoSharp } from "react-icons/io5";

import Container from "@/components/common/Container";
import { largerPurposeData } from "@/data/home";

export default function LargerPurposeSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-14
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
          w-[70px]
          opacity-30
          sm:w-[100px]
          lg:w-[145px]
          xl:w-[180px]
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
          w-[70px]
          opacity-25
          sm:w-[100px]
          lg:w-[145px]
          xl:w-[180px]
        "
      />

      <Container className="relative z-10">
        {/* ===================================================
            SECTION INTRO
            =================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}

          <p
            className="
              font-Unkempt
              text-2xl
              font-bold
              tracking-[0.25em]
              text-primary
              sm:text-3xl
              lg:text-4xl
            "
          >
            {largerPurposeData.eyebrow}
          </p>

          {/* Title */}

          <h2
            className="
              mt-4
              text-2xl
              font-semibold
              leading-tight
              tracking-tight
              text-secondary
              sm:text-3xl
              lg:text-4xl
            "
          >
            {largerPurposeData.title}
          </h2>

          {/* Divider */}

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary/20 sm:w-14" />

            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[85px]
                opacity-60
                sm:w-[95px]
              "
            />

            <span className="h-px w-10 bg-primary/20 sm:w-14" />
          </div>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-slate-600
              sm:text-lg
              sm:leading-8
            "
          >
            {largerPurposeData.description}
          </p>
        </div>

        {/* ===================================================
            JOURNEY
            =================================================== */}

        <div
          className="
            mx-auto
            mt-10
            grid
            max-w-[1050px]
            grid-cols-1
            gap-7
            sm:grid-cols-2
            md:mt-12
            md:gap-8
            xl:grid-cols-5
            xl:gap-5
          "
        >
          {largerPurposeData.journey.map((item, index) => (
            <div
              key={item.id}
              className="
                relative
                mx-auto
                w-full
                max-w-[300px]
                xl:max-w-none
              "
            >
              {/* =================================================
                  IMAGE CARD
                  ================================================= */}

              <div
                className="
                  group
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-slate-100
                  bg-white
                  shadow-[0_10px_30px_rgba(24,59,59,0.08)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_16px_38px_rgba(24,59,59,0.13)]
                "
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={700}
                    height={700}
                    className="
                      block
                      aspect-square
                      h-auto
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  TITLE BELOW IMAGE
                  ================================================= */}

              <div className="mt-3 text-center">
                <p
                  className="
                    text-sm
                    font-semibold
                    leading-5
                    text-secondary
                    sm:text-base
                  "
                >
                  {item.title}
                </p>

                {/* Small journey number */}

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    tracking-[0.18em]
                    text-primary/70
                  "
                >
                  STEP {index + 1}
                </p>
              </div>

              {/* =================================================
                  CONNECTING ARROW
                  ================================================= */}

              {index < largerPurposeData.journey.length - 1 && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-[25px]
                    top-[42%]
                    z-20
                    hidden
                    -translate-y-1/2
                    xl:block
                  "
                >
                  <IoArrowRedoSharp
                    className="
                      h-7
                      w-7
                      text-[#2563eb]
                      drop-shadow-[0_2px_4px_rgba(37,99,235,0.15)]
                    "
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===================================================
            JOURNEY END DECORATION
            =================================================== */}

        <div
          className="
            mx-auto
            mt-9
            flex
            max-w-4xl
            items-center
            justify-center
            gap-4
            sm:mt-11
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
      </Container>

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