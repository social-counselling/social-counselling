import Image from "next/image";
import {
  CalendarDays,
  Heart,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import { contactData } from "@/data/contact";

const icons = {
  phone: Phone,
  mail: Mail,
  location: MapPin,
  lock: LockKeyhole,
  heart: Heart,
  users: Users,
  leaf: Leaf,
} as const;

export default function ContactUsSection() {
  return (
    <section className="relative isolate  overflow-hidden bg-[#eef8f1]">

      {/* =====================================================
          GLOBAL SIDE BOTANICAL DECORATION
          ===================================================== */}



      {/* =====================================================
          CONTACT HERO
          ===================================================== */}

      <section className="relative mt-22 bg-[#eef8f1]">

        {/* Soft decorative glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-1/2
            h-[420px]
            w-[420px]
            -translate-y-1/2
            rounded-full
            bg-white/45
            blur-3xl
          "
        />

        <Container className="relative z-10">

          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-10
              py-12

              sm:gap-12
              sm:py-16

              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-12
              lg:py-18

              xl:grid-cols-[0.88fr_1.12fr]
              xl:gap-16
              xl:py-20

              2xl:gap-20
            "
          >

            {/* =================================================
                LEFT CONTENT
                ================================================= */}

            <div className="relative z-10 text-center lg:text-left">

              {/* Eyebrow */}
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-primary

                  sm:text-xs

                  lg:text-sm
                "
              >
                {contactData.eyebrow}
              </p>

              {/* Title */}
              <h1
                className="
                  mt-3
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-tight
                  text-secondary

                  sm:text-5xl

                  lg:text-[52px]

                  xl:text-[60px]

                  2xl:text-[64px]
                "
              >
                {contactData.title}
              </h1>

              {/* Divider */}
              <div
                className="
                  mt-5
                  flex
                  justify-center
                  lg:justify-start
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
                    opacity-70

                    sm:w-[105px]
                  "
                />
              </div>

              {/* Description */}
              <p
                className="
                  mx-auto
                  mt-6
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-600

                  sm:text-base
                  sm:leading-8

                  lg:mx-0
                  lg:text-[17px]
                  lg:leading-8
                "
              >
                {contactData.description}
              </p>

              {/* =================================================
                  QUICK CONTACT
                  ================================================= */}

              <div
                className="
                  mx-auto
                  mt-8
                  grid
                  max-w-xl
                  grid-cols-3
                  gap-2.5

                  sm:gap-4

                  lg:mx-0
                "
              >
                {contactData.quickLinks.map((item) => {
                  const Icon = icons[item.icon];

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="
                        group
                        rounded-[18px]
                        border
                        border-white/90
                        bg-white/85
                        px-2
                        py-3
                        text-center
                        shadow-[0_8px_25px_rgba(24,59,59,0.05)]
                        backdrop-blur-md
                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:bg-white
                        hover:shadow-[0_14px_35px_rgba(24,59,59,0.1)]

                        sm:rounded-[22px]
                        sm:px-3
                        sm:py-4
                      "
                    >
                      <span
                        className="
                          mx-auto
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-primary/10
                          text-primary
                          transition-transform
                          duration-300

                          group-hover:scale-105

                          sm:h-11
                          sm:w-11
                        "
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>

                      <span
                        className="
                          mt-2
                          block
                          text-[10px]
                          font-bold
                          text-secondary

                          sm:text-xs

                          lg:text-sm
                        "
                      >
                        {item.title}
                      </span>

                      <span
                        className="
                          mt-1
                          block
                          text-[8px]
                          leading-4
                          text-slate-500

                          sm:text-[10px]

                          lg:text-xs
                        "
                      >
                        {item.subtitle}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                HERO IMAGE
                ================================================= */}

            <div
              className="
                relative
                z-10
                mx-auto
                w-full
                max-w-[720px]
              "
            >

              {/* Image glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-5
                  -top-5
                  h-24
                  w-24
                  rounded-full
                  bg-primary/10
                  blur-2xl

                  sm:-right-8
                  sm:-top-8
                  sm:h-32
                  sm:w-32
                "
              />

              {/* Image frame */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/80
                  bg-white
                  shadow-[0_20px_55px_rgba(24,59,59,0.13)]

                  sm:rounded-[32px]

                  lg:rounded-[38px]
                "
              >

                {/* Desktop */}
                <Image
                  src="/images/contact/contact-hero-desktop.png"
                  alt="Counsellor sitting at a desk with a laptop"
                  width={1200}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="
                    hidden
                    h-auto
                    w-full
                    lg:block
                  "
                />

                {/* Mobile */}
                <Image
                  src="/images/contact/contact-hero-mobile.png"
                  alt="Counsellor sitting at a desk with a laptop"
                  width={900}
                  height={1200}
                  sizes="100vw"
                  className="
                    block
                    h-auto
                    w-full
                    lg:hidden
                  "
                />

                {/* Bottom fade */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-16
                    bg-gradient-to-t
                    from-white/20
                    to-transparent
                  "
                />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
          ===================================================== */}

      <section
        id="contact-information"
        className="
          relative
          border-y
          border-primary/10
          bg-white
          py-14

          sm:py-16

          lg:py-20
        "
      >
        <Container className="relative z-10">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-primary

                sm:text-xs
              "
            >
              Stay Connected
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-bold
                tracking-tight
                text-secondary

                sm:text-4xl

                lg:text-[42px]
              "
            >
              Contact Information
            </h2>

            <div
              className="mt-4 flex justify-center"
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
                  opacity-65
                "
              />
            </div>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-slate-600

                sm:text-base
                sm:leading-7
              "
            >
              You can reach us through any of the following channels.
            </p>

          </div>

          {/* Information cards */}
          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-6xl
              grid-cols-1
              gap-4

              sm:gap-5

              md:grid-cols-3

              lg:mt-12
            "
          >
            {contactData.information.map((item) => {
              const Icon = icons[item.icon];

              return (
                <div
                  key={item.id}
                  className="
                    group
                    rounded-[24px]
                    border
                    border-slate-100
                    bg-white
                    p-6
                    text-center
                    shadow-[0_10px_35px_rgba(24,59,59,0.05)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-[0_16px_40px_rgba(24,59,59,0.08)]

                    lg:p-7
                  "
                >
                  <span
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                      transition-transform
                      duration-300

                      group-hover:scale-105
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3
                    className="
                      mt-4
                      text-lg
                      font-bold
                      text-secondary
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {item.value}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

        </Container>
      </section>

      {/* =====================================================
          DIFFERENT PERSPECTIVE CTA
          ===================================================== */}

      <section
        className="
          relative
          bg-white
          px-4
          py-9

          sm:px-6
          sm:py-11

          lg:py-14
        "
      >
        <Container>

          <div
            className="
              relative
              mx-auto
              max-w-6xl
              overflow-hidden
              rounded-[30px]
              border
              border-primary/10
              bg-gradient-to-br
              from-[#edf8f0]
              via-[#f4fbf5]
              to-white
              px-6
              py-8
              shadow-[0_12px_40px_rgba(24,59,59,0.06)]

              sm:rounded-[36px]
              sm:px-10
              sm:py-10

              lg:px-14
              lg:py-11
            "
          >

            {/* =================================================
                CTA TOP-LEFT LEAF
                ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-0
                h-[85px]
                w-[105px]
                bg-[url('/images/contact/section-leaf-left1.png')]
                bg-left-top
                bg-contain
                bg-no-repeat
                opacity-30

                sm:h-[105px]
                sm:w-[130px]

                lg:h-[125px]
                lg:w-[155px]
              "
            />

            {/* =================================================
                CTA BOTTOM-RIGHT LEAF
                ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                right-0
                z-0
                h-[85px]
                w-[105px]
                bg-[url('/images/contact/section-leaf-right.png')]
                bg-bottom-right
                bg-contain
                bg-no-repeat
                opacity-30

                sm:h-[105px]
                sm:w-[130px]

                lg:h-[125px]
                lg:w-[155px]
              "
            />

            {/* CTA content */}
            <div
              className="
                relative
                z-10
                mx-auto
                grid
                max-w-5xl
                items-center
                gap-7
                text-center

                lg:grid-cols-[1.35fr_0.65fr]
                lg:gap-10
                lg:text-left
              "
            >

              {/* Quote */}
              <div>
                <p
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    italic
                    leading-[1.2]
                    text-secondary

                    sm:text-3xl

                    lg:text-[38px]
                  "
                >
                  {contactData.message.title}
                </p>
              </div>

              {/* CTA */}
              <div
                className="
                  flex
                  flex-col
                  items-center
                  border-t
                  border-primary/15
                  pt-5

                  lg:items-start
                  lg:border-l
                  lg:border-t-0
                  lg:pl-10
                  lg:pt-0
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-secondary

                    sm:text-base

                    lg:text-lg
                  "
                >
                  {contactData.message.subtitle}
                </p>

                <Button
                  href="/book-session"
                  size="md"
                  className="
                    mt-4
                    rounded-full
                    px-6
                    shadow-[0_8px_20px_rgba(24,59,59,0.12)]
                  "
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a Session
                </Button>
              </div>

            </div>
          </div>

        </Container>
      </section>

      {/* =====================================================
          OUR PROMISE
          ===================================================== */}

      <section
        className="
          relative
          border-t
          border-primary/10
          bg-[#f8fcf8]
          py-11

          sm:py-13

          lg:py-15
        "
      >
        <Container className="relative z-10">

          {/* Heading */}
          <div
            className="
              mx-auto
              mb-9
              max-w-2xl
              text-center

              sm:mb-10
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-primary

                sm:text-xs
              "
            >
              Our Promise
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-secondary

                sm:text-3xl
              "
            >
              Support you can trust
            </h2>

            <div
              className="mt-3 flex justify-center"
              aria-hidden="true"
            >
              <Image
                src="/images/home/introduction/leaf-divider.png"
                alt=""
                width={140}
                height={40}
                className="
                  h-auto
                  w-[85px]
                  opacity-60
                "
              />
            </div>
          </div>

          {/* Values */}
          <div
            className="
              grid
              grid-cols-2
              gap-x-5
              gap-y-9

              lg:grid-cols-4
              lg:gap-0
              lg:divide-x
              lg:divide-primary/10
            "
          >
            {contactData.values.map((item) => {
              const Icon = icons[item.icon];

              return (
                <div
                  key={item.id}
                  className="
                    px-3
                    text-center

                    lg:px-8
                  "
                >
                  <span
                    className="
                      mx-auto
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3
                    className="
                      mt-3
                      text-sm
                      font-bold
                      text-secondary

                      sm:text-base
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-1
                      max-w-[180px]
                      text-[11px]
                      leading-5
                      text-slate-500

                      sm:text-xs
                    "
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </Container>
      </section>

    </section>
  );
}