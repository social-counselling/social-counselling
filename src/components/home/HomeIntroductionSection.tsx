import Image from "next/image";

import Container from "@/components/common/Container";

import { homeIntroduction } from "@/data/home";

export default function HomeIntroductionSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* =====================================================
          DECORATIVE BOTANICAL ELEMENTS
          ===================================================== */}

      {/* Top-left leaves */}
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
    w-[120px]
    opacity-70
    sm:w-[170px]
    lg:w-[230px]
    xl:w-[255px]
  "
/>

      {/* Top-right leaves */}
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
    w-[120px]
    opacity-60
    sm:w-[170px]
    lg:w-[220px]
    xl:w-[240px]
  "
/>

      {/* Bottom-right leaves */}
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
          w-[150px]
          opacity-50
          sm:w-[200px]
          lg:w-[260px]
          xl:w-[285px]
        "
      />

      <Container className="relative z-10">
        {/* ===================================================
            SECTION HEADER
            =================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.28em]
              text-primary
              sm:text-sm
            "
          >
            {homeIntroduction.eyebrow}
          </p>

          {/* Horizontal botanical divider */}
          <div className="mt-4 flex justify-center sm:mt-5">
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="
                h-auto
                w-[100px]
                opacity-75
                sm:w-[125px]
                lg:w-[140px]
              "
            />
          </div>
        </div>

        {/* ===================================================
            MAIN CONTENT
            =================================================== */}

        <div
          className="
            relative
            mt-10
            lg:mt-14
          "
        >
          {/* =================================================
              DESKTOP VERTICAL DIVIDER
              ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-6
              left-1/2
              top-6
              hidden
              -translate-x-1/2
              lg:block
            "
            aria-hidden="true"
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-px
                -translate-x-1/2
                bg-primary/25
              "
            />

            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={40}
              height={140}
              className="
                absolute
                left-1/2
                top-1/2
                h-auto
                w-[34px]
                -translate-x-1/2
                -translate-y-1/2
                rotate-90
                opacity-80
              "
            />
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-12
              lg:grid-cols-2
              lg:gap-20
              xl:gap-24
            "
          >
            {/* =================================================
                LEFT SIDE
                ================================================= */}

            <div className="relative">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2
                  className="
                    max-w-2xl
                    text-3xl
                    font-bold
                    leading-[1.08]
                    tracking-tight
                    text-secondary
                    sm:text-2xl
                    lg:text-[32px]
                    xl:text-[38px]
                  "
                >
                  {homeIntroduction.title}
                </h2>

                {/* =============================================
                    MOBILE IMAGE
                    ============================================= */}

                <div
                  className="
                    relative
                    mt-8
                    overflow-hidden
                    rounded-[32px]
                    sm:mt-10
                    lg:hidden
                  "
                >
                  <Image
                    src="/images/home/introduction/introduction-scene.png"
                    alt="A peaceful mountain lake landscape"
                    width={1536}
                    height={1024}
                    className="
                      block
                      h-auto
                      w-full
                      object-cover
                    "
                  />
                </div>

                {/* =============================================
                    DESKTOP IMAGE
                    ============================================= */}

                <div
  className="
    relative
    mt-10
    hidden
    overflow-hidden
    rounded-[42px]
    lg:block
  "
>
  <Image
    src="/images/home/introduction/introduction-scene.png"
    alt="A peaceful mountain lake landscape"
    width={1536}
    height={1024}
    sizes="(min-width: 1280px) 48vw, 50vw"
    className="
      block
      h-auto
      w-full
    "
  />
</div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE
                ================================================= */}

            <div
              className="
                flex
                items-center
                lg:min-h-full
              "
            >
              <div className="w-full max-w-2xl">
                {/* Mobile divider */}
                <div
                  className="
                    mb-8
                    flex
                    justify-center
                    lg:hidden
                  "
                  aria-hidden="true"
                >
                  <Image
                    src="/images/home/introduction/leaf-divider.png"
                    alt=""
                    width={140}
                    height={40}
                    className="
                      h-auto
                      w-[110px]
                      opacity-65
                    "
                  />
                </div>

                <div className="space-y-7 sm:space-y-8">
                  {homeIntroduction.paragraphs.map(
                    (paragraph, index) => (
                      <div key={index}>
                        <p
                          className="
                            text-base
                            leading-8
                            text-slate-600
                            sm:text-lg
                            sm:leading-9
                            lg:text-[17px]
                            xl:text-lg
                          "
                        >
                          {paragraph}
                        </p>

                        {/* Subtle botanical divider */}
                        {index === 0 && (
                          <div
                            className="
                              mt-7
                              flex
                              justify-center
                              sm:mt-8
                            "
                            aria-hidden="true"
                          >
                            <Image
                              src="/images/home/introduction/leaf-divider.png"
                              alt=""
                              width={140}
                              height={40}
                              className="
                                h-auto
                                w-[105px]
                                opacity-50
                                sm:w-[120px]
                              "
                            />
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* =====================================================
          BOTTOM BOTANICAL DECORATION
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
          w-[110px]
          opacity-40
          sm:w-[160px]
          lg:w-[200px]
          xl:w-[220px]
        "
      />
    </section>
  );
}