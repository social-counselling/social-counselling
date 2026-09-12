import Image from "next/image";

import Container from "@/components/common/Container";

import { individualityData, principlesData } from "@/data/home";

export default function PrinciplesSection() {
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
        {/* =========================
            PRINCIPLES
        ========================== */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-2xl
              font-bold

              tracking-[0.32em]
              text-primary
              sm:text-2xl
              lg:text-4xl font-Unkempt">
            {principlesData.eyebrow}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-secondary sm:text-2xl lg:text-3xl">
            {principlesData.title}
          </h2>

          {/* Leaf divider */}
          <div className="mt-5 flex justify-center">
            <Image
              src="/images/home/introduction/leaf-divider.png"
              alt=""
              width={140}
              height={40}
              aria-hidden="true"
              className="h-auto w-[105px] opacity-70"
            />
          </div>
        </div>

        {/* Principle cards */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3 lg:mt-12">
          {principlesData.principles.map((principle) => (
            <article
              key={principle.id}
              className="
                rounded-[26px]
                border
                border-primary/10
                bg-[#f7fcf8]
                p-6
                shadow-[0_8px_30px_rgba(24,59,59,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_14px_35px_rgba(24,59,59,0.09)]
                sm:p-7
                lg:p-8
              "
            >
              <span className="font-serif text-4xl italic text-primary/35">
                {principle.title.charAt(0)}
              </span>

              <h3 className="mt-3 text-xl font-semibold text-secondary sm:text-2xl">
                {principle.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                {principle.description}
              </p>
            </article>
          ))}
        </div>

        {/* =========================
            CONNECTION DIVIDER
        ========================== */}
        <div className="mx-auto my-12 flex max-w-4xl items-center justify-center gap-4 sm:my-14">
          <span className="h-px flex-1 bg-primary/15" />

          <Image
            src="/images/home/introduction/horizontal_leaves1.png"
            alt=""
            width={140}
            height={40}
            aria-hidden="true"
            className="h-auto w-[90px] opacity-55"
          />

          <span className="h-px flex-1 bg-primary/15" />
        </div>

        {/* =========================
            INDIVIDUALITY
        ========================== */}
        <div className="mx-auto max-w-4xl text-center">
          <p className=" font-bold

              tracking-[0.32em]
              text-primary
              sm:text-2xl
              lg:text-4xl font-Unkempt">
            {individualityData.eyebrow}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-secondary sm:text-2xl lg:text-3xl">
            {individualityData.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            {individualityData.description}
          </p>
        </div>

        {/* Bottom breathing space */}
        <div className="h-2 sm:h-4" />
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