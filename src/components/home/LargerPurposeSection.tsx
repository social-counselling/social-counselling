import Image from "next/image";

import Container from "@/components/common/Container";

import { largerPurposeData } from "@/data/home";


export default function LargerPurposeSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">

      {/* =====================================================
          TOP BOTANICAL
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

        {/* =====================================================
            SECTION INTRO
            ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">

          <p
            className="
              text-2xl
              font-bold
              tracking-[0.25em]
              text-primary
              sm:text-2xl
              lg:text-4xl
              font-Unkempt
            "
          >
            {largerPurposeData.eyebrow}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-secondary sm:text-3xl lg:text-4xl">
            {largerPurposeData.title}
          </h2>

          <div className="mt-5 flex justify-center">
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="h-auto w-[95px] opacity-60"
            />
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {largerPurposeData.description}
          </p>

        </div>

        {/* =====================================================
            JOURNEY
            ===================================================== */}

        <div
          className="
            mx-auto
            mt-10
            grid
            max-w-[1500px]
            grid-cols-1
            gap-5
            sm:grid-cols-2
            md:mt-12
            md:gap-6
            xl:grid-cols-5
            xl:gap-4
          "
        >
          {largerPurposeData.journey.map((item, index) => (
            <div
              key={item.id}
              className="
                relative
                mx-auto
                w-full
                max-w-[380px]
                xl:max-w-none
              "
            >

              {/* =================================================
                  CARD IMAGE
                  ================================================= */}

              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={700}
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                  "
                />
              </div>

              {/* =================================================
                  DESKTOP CONNECTING ARROW
                  ================================================= */}

              {index < largerPurposeData.journey.length - 1 && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-[-18px]
                    top-1/2
                    z-20
                    hidden
                    -translate-y-1/2
                    xl:block
                  "
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 19H28"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-primary"
                    />

                    <path
                      d="M21 10L30 19L21 28"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    />
                  </svg>
                </div>
              )}

            </div>
          ))}
        </div>

      </Container>

      {/* =====================================================
          BOTTOM BOTANICAL
          ===================================================== */}

      {/* <Image
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
          opacity-25
          sm:w-[105px]
          lg:w-[145px]
          xl:w-[180px]
        "
      />

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
          w-[80px]
          opacity-25
          sm:w-[110px]
          lg:w-[150px]
          xl:w-[190px]
        "
      /> */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-[55px]
          overflow-hidden
          sm:h-[65px]
          lg:h-[75px]
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