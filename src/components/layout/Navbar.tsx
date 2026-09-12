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
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        w-full
      "
    >
      {/* =====================================================
          FULL WIDTH NAVBAR
          ===================================================== */}

      <nav
        className="
          w-full
          border-b
          border-white/60
          bg-white/90
          shadow-[0_4px_24px_rgba(24,59,59,0.07)]

        "
      >
        <Container>
          {/* =================================================
              DESKTOP / MOBILE TOP ROW
              ================================================= */}

          <div
            className="
              flex
              min-h-[72px]
              items-center
              justify-between
              gap-4
              sm:min-h-[78px]
              lg:min-h-[86px]
            "
          >
            {/* ===============================================
                LOGO
                =============================================== */}

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
                src="/images/logo/logo2.png"
                alt="Social Counselling"
                width={180}
                height={70}
                priority
                className="
                  h-auto
                  w-[120px]
                  sm:w-[135px]
                  lg:w-[165px]
                  xl:w-[185px]
                "
              />
            </Link>

            {/* ===============================================
                DESKTOP NAVIGATION
                =============================================== */}

            <div
              className="
                hidden
                flex-1
                items-center
                justify-end
                gap-3
                lg:flex
                xl:gap-5
              "
            >
              {/* Navigation Links */}

              <div
                className="
                  flex
                  items-center
                  gap-0.5
                  xl:gap-1
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
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        transition-colors
                        duration-200
                        xl:px-4
                        xl:text-[15px]

                        ${
                          active
                            ? "text-primary"
                            : "text-secondary hover:text-primary"
                        }
                      `}
                    >
                      {item.label}

                      {/* Active underline */}

                      {active && (
                        <span
                          className="
                            absolute
                            bottom-0
                            left-1/2
                            h-0.5
                            w-7
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
                  DESKTOP CTA
                  ============================================= */}

              <Button
                href={navigationCta.href}
                size="md"
                className="
                  ml-1
                  shrink-0
                  rounded-full
                  px-5
                  xl:ml-2
                  xl:px-6
                "
              >
                {navigationCta.label}
              </Button>
            </div>

            {/* ===============================================
                MOBILE / TABLET MENU BUTTON
                =============================================== */}

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
                border-slate-200
                bg-white
                text-secondary
                shadow-sm
                transition
                hover:border-primary/30
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

          {/* =================================================
              MOBILE / TABLET MENU
              ================================================= */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-out
              lg:hidden

              ${
                isMenuOpen
                  ? "max-h-[650px] pb-4 opacity-100"
                  : "max-h-0 pb-0 opacity-0"
              }
            `}
          >
            <div
              className="
                border-t
                border-slate-100
                pt-3
              "
            >
              {/* =============================================
                  MOBILE LINKS
                  ============================================= */}

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
                        py-3
                        text-sm
                        font-medium
                        transition-colors
                        duration-200

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

              {/* =============================================
                  MOBILE CTA
                  ============================================= */}

              <div className="mt-3 border-t border-slate-100 pt-3">
                <Button
                  href={navigationCta.href}
                  size="md"
                  className="w-full rounded-full"
                  onClick={closeMenu}
                >
                  {navigationCta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}