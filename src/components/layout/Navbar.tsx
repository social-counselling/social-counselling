"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

import {
  mainNavigation,
  navigationCta,
} from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* =========================================================
     SCROLL STATE
     ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
      "
    >
      {/* =====================================================
          MAIN HEADER
          ===================================================== */}

      <Container
        className={`
          transition-[padding]
          duration-300
          ease-out

          ${
            isScrolled
              ? "pt-0"
              : "sm:pt-0 lg:pt-4 xl:pt-3"
          }
        `}
      >
        <div
          className={`
            flex
            items-start
            justify-between

            transition-[padding]
            duration-300
            ease-out

            ${
              isScrolled
                ? "pt-0"
                : "pt-2 sm:pt-0 lg:pt-4 xl:pt-2"
            }
          `}
        >
          {/* =================================================
              LOGO
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
              src="/images/logo/mainLogo.png"
              alt="Social Counselling"
              width={180}
              height={70}
              priority
              className="
                h-auto
                w-[120px]

                sm:w-[120px]

                lg:w-[145px]

                min-[1350px]:w-[195px]

                xl:w-[195px]
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          {/* =================================================
    DESKTOP NAVIGATION
    ================================================= */}

<div
  className="
    relative
    hidden
    lg:flex
    items-center
  "
>
  {/* =================================================
      HORIZONTAL BOTANICAL LEAF
      ================================================= */}

  <div
    className="
      pointer-events-none
      absolute
      left-1/2
      top-0
      z-20
      flex
      -translate-x-1/2
      -translate-y-1/2
      items-center
      justify-center
    "
  >
    <Image
      src="/images/home/introduction/vertical1.png"
      alt=""
      width={128}
      height={671}
      aria-hidden="true"
      className="
        block
        h-auto
        w-[150px]
        rotate-90
        opacity-60
      "
    />
  </div>

  {/* =================================================
      NAVIGATION PILL
      ================================================= */}

  <nav
    className="
      relative
      z-10
      flex
      items-center
      gap-0
      rounded-full
      border
      border-white/50
      bg-white/80
      px-3
      py-1
      shadow-[0_8px_30px_rgba(24,59,59,0.08)]
      backdrop-blur-md

      min-[1350px]:gap-2
      min-[1350px]:px-3
      min-[1350px]:py-2.5

      xl:px-3
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
              px-2
              py-2
              text-sm
              font-medium
              transition-all
              duration-200

              min-[1350px]:px-4
              min-[1350px]:text-base

              xl:px-4

              ${
                active
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
              }
            `}
          >
            {item.label}

            {active && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
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
        px-4
        min-[1350px]:ml-3
        min-[1350px]:px-7
      "
    >
      {navigationCta.label}
    </Button>
  </nav>
</div>

          {/* =================================================
              MOBILE / TABLET MENU BUTTON
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
                    <span>{item.label}</span>

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
                mt-2
                border-t
                border-border
                pt-0
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