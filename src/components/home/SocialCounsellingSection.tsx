import Image from "next/image";

import Container from "@/components/common/Container";
import { socialCounsellingData } from "@/data/home";

export default function SocialCounsellingSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-16
        sm:py-20
        lg:py-24
        xl:py-28
      "
    >

{/* =====================================================
    LEFT VERTICAL BOTANICAL BORDER
    ===================================================== */}

<Image
  src="/images/home/introduction/vertical2.png"
  alt=""
  width={128}
  height={671}
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    left-0
    top-1/2
    z-0
    h-[600px]
    w-auto
    -translate-y-1/2
    opacity-25
    sm:h-[400px]
    sm:opacity-28
    md:h-[480px]
    md:opacity-30
    lg:h-[540px]
    xl:h-[600px]
    xl:opacity-35
  "
/>



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
          w-[80px]
          opacity-30
          sm:w-[110px]
          lg:w-[155px]
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
          w-[85px]
          opacity-30
          sm:w-[115px]
          lg:w-[160px]
          xl:w-[195px]
        "
      />

      <Container className="relative z-10">
        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="mx-auto max-w-5xl text-center">
          <p
            className="
              text-4xl
              font-bold
              uppercase
              tracking-[0.32em]
              text-primary
              sm:text-4xl
              lg:text-4xl

              
            "
          >
            {socialCounsellingData.eyebrow}
          </p>

          <div
            className="
              mt-4
              flex
              justify-center
              sm:mt-5
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
                w-[100px]
                opacity-70
                sm:w-[120px]
                lg:w-[135px]
              "
            />
          </div>

          <h2
            className="
              mx-auto
              mt-5
              max-w-4xl
              text-xl
              font-bold
              leading-[1.08]
              tracking-tight
              text-secondary
              sm:text-xl
              lg:text-2xl
              xl:text-2xl
            "
          >
            {socialCounsellingData.title}
          </h2>

          {/* elegant curved botanical accent */}

          <div
            className="
              mx-auto
              mt-5
              flex
              justify-center
              sm:mt-6
            "
            aria-hidden="true"
          >
            <Image
              src="/images/home/introduction/horizontal_leaves1.png"
              alt=""
              width={240}
              height={40}
              className="
                h-auto
                w-[115px]
                opacity-60
                sm:w-[135px]
              "
            />
          </div>
        </div>

        {/* ===================================================
            MAIN CONTENT
            =================================================== */}

        <div
          className="
            mt-10
            sm:mt-12
            lg:mt-14
            xl:mt-16
          "
        >
          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-10
              xl:grid-cols-[0.88fr_1.12fr]
              xl:gap-20
              2xl:gap-24
            "
          >
            {/* =================================================
                LEFT — STORY / CONTENT
                ================================================= */}

            <div className="relative order-2 xl:order-1">
              {/* desktop accent line */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  top-0
                  hidden
                  h-full
                  xl:block
                "
                aria-hidden="true"
              >
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary/15" />

                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={40}
                  height={140}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[30px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-90
                    opacity-60
                  "
                />
              </div>

              {/* mobile divider */}

              <div
                className="
                  mb-7
                  flex
                  justify-center
                  xl:hidden
                "
                aria-hidden="true"
              >
                <Image
                  src="/images/home/introduction/leaf-divider.png"
                  alt=""
                  width={140}
                  height={40}
                  className="h-auto w-[105px] opacity-55"
                />
              </div>

              <div className=" mx-auto w-full max-w-2xl space-y-7 sm:space-y-8 xl:mx-0 xl:max-w-none ">
                {socialCounsellingData.paragraphs.map(
                  (paragraph, index) => (
                    <div key={paragraph}>
                      <p
                        className="
                           text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-8
                          xl:text-[17px]
                     xl:leading-9
                        "
                      >
                        {paragraph}
                      </p>

                      {index === 0 && (
                        <div
                          className="
                            mt-6
                            flex
                            justify-start
                            sm:mt-7
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
                              w-[90px]
                              opacity-45
                              sm:w-[105px]
                            "
                          />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                RIGHT — COUNSELLING SCENE
                ================================================= */}

            <div className="relative order-1 xl:order-2">
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-5
                  rounded-[45%]
                  bg-primary/[0.035]
                  blur-3xl
                "
                aria-hidden="true"
              />

              <div className="relative overflow-hidden">
                <Image
                  src="/images/home/social-counselling/social-counselling-scene1.png"
                  alt="A counselling conversation beside a peaceful mountain lake"
                  width={1536}
                  height={1024}
                  sizes="
                    (min-width: 1280px) 58vw,
                    100vw
                  "
                  className="
                    block
                    h-auto
                    w-full
                  "
                />

                {/* soft bottom fade */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[100px]
                    bg-gradient-to-t
                    from-white
                    via-white/25
                    to-transparent
                    sm:h-[125px]
                  "
                  aria-hidden="true"
                />
              </div>
            </div>
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
          w-[90px]
          opacity-25
          sm:w-[120px]
          lg:w-[170px]
          xl:w-[205px]
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
          w-[110px]
          opacity-30
          sm:w-[140px]
          lg:w-[180px]
          xl:w-[215px]
        "
      />
    </section>
  );
}