"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import {
  mainNavigation,
  navigationCta,
} from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* =========================================================
     CLOSE MOBILE MENU
     ========================================================= */

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      {/* =====================================================
          MAIN HEADER

          Logo and navigation are SEPARATE.
          There is NO background around both.
          ===================================================== */}

      <Container className="pt-4">

        <div
          className="
            flex
            items-start
            justify-between
            pt-4

            sm:pt-5

            lg:pt-2
            xl:pt-2
          "
        >

          {/* =================================================
              LOGO
              LEFT SIDE
              ================================================= */}

          <Link
            href="/"
            aria-label="Social Counselling home"
            onClick={closeMenu}
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
            "
          >
            <Image
              src="/images/logo/logo.png"
              alt="Social Counselling"
              width={180}
              height={70}
              priority
              className="
                h-auto
                w-[105px]

                sm:w-[120px]

                lg:w-[190px]

                xl:w-[195px]
              "
            />
          </Link>


          {/* =================================================
              RIGHT SIDE
              DESKTOP NAVIGATION
              ================================================= */}

          <div
            className="
              hidden
              items-center
              lg:flex
            "
          >

            {/* ===============================================
                NAVIGATION PILL
                =============================================== */}

            <nav
              className="
                flex
                items-center
                gap-1

                rounded-full

                border
                border-white/50

                bg-white/80

                px-4
                py-1

                shadow-[0_8px_30px_rgba(24,59,59,0.08)]

                

                xl:gap-2
                xl:px-5
                xl:py-2.5
              "
            >

              {/* =============================================
                  NAVIGATION LINKS
                  ============================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-1

                  xl:gap-2
                "
              >

                {mainNavigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative

                        whitespace-nowrap

                        rounded-full

                        px-3
                        py-2

                        text-base
                        font-medium

                        transition-all
                        duration-200

                        xl:px-4

                        ${
                          active
                            ? "text-primary"
                            : "text-secondary hover:text-primary"
                        }
                      `}
                    >

                      {item.label}

                      {/* ===================================
                          ACTIVE UNDERLINE
                          =================================== */}

                      {active && (
                        <span
                          className="
                            absolute
                            left-1/2
                            bottom-0

                            h-0.5
                            w-10

                            -translate-x-1/2

                            rounded-full

                            bg-primary
                          "
                        />
                      )}

                    </Link>
                  );
                })}

              </div>


              {/* =============================================
                  BOOK SESSION BUTTON
                  ============================================= */}

              <Button
                href={navigationCta.href}
                size="md"
                className="
                  ml-2
                  shrink-0
                  rounded-full
                  px-6

                  xl:ml-3
                  xl:px-7
                "
              >
                {navigationCta.label}
              </Button>

            </nav>

          </div>


          {/* =================================================
              MOBILE / TABLET MENU BUTTON
              RIGHT SIDE
              ================================================= */}

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((previous) => !previous)
            }
            className="
              flex
              h-10
              w-10

              shrink-0

              items-center
              justify-center

              rounded-full

              border
              border-white/70

              bg-white/70

              text-secondary

              shadow-sm

              backdrop-blur-md

              transition

              hover:bg-white
              hover:text-primary

              sm:h-11
              sm:w-11

              lg:hidden
            "
          >

            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}

          </button>

        </div>


        {/* ===================================================
            MOBILE / TABLET MENU

            This remains separate from the logo.
            =================================================== */}

        <div
          className={`
            overflow-hidden

            transition-all
            duration-300

            lg:hidden

            ${
              isMenuOpen
                ? "mt-2 max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div
            className="
              rounded-[22px]

              border
              border-white/60

              bg-white/80

              p-3

              shadow-[0_12px_40px_rgba(24,59,59,0.12)]

              backdrop-blur-xl
            "
          >

            {/* ===============================================
                MOBILE LINKS
                =============================================== */}

            <div className="flex flex-col">

              {mainNavigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      flex
                      items-center
                      justify-between

                      rounded-xl

                      px-4
                      py-3.5

                      text-sm
                      font-medium

                      transition-colors

                      ${
                        active
                          ? "bg-primary-light text-primary"
                          : "text-secondary hover:bg-background-soft hover:text-primary"
                      }
                    `}
                  >

                    <span>
                      {item.label}
                    </span>

                    {active && (
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-primary
                        "
                      />
                    )}

                  </Link>
                );
              })}

            </div>


            {/* ===============================================
                MOBILE CTA
                =============================================== */}

            <div
              className="
                mt-3
                border-t
                border-border
                pt-3
              "
            >

              <Button
                href={navigationCta.href}
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                {navigationCta.label}
              </Button>

            </div>

          </div>

        </div>

      </Container>

    </header>
  );
}