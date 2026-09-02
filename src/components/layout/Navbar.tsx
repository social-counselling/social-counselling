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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Container className="pt-3 sm:pt-4">
          <nav
            className="
              flex
              min-h-[68px]
              items-center
              justify-between
              rounded-[22px]
              border
              border-white/70
              bg-white/85
              px-4
              shadow-[0_8px_30px_rgba(24,59,59,0.08)]
              backdrop-blur-xl
              sm:px-5
              lg:min-h-[76px]
              lg:px-6
            "
          >
            {/* =================================================
                LOGO
                ================================================= */}

            <Link
              href="/"
              aria-label="Social Counselling home"
              className="relative flex shrink-0 items-center"
              onClick={closeMenu}
            >
              <Image
                src="/images/logo/Social Counselling Icon.png"
                alt="Social Counselling"
                width={80}
                height={30}
                priority
                className="
                  h-auto
                  w-[60px]
                  sm:w-[40px]
                  lg:w-[80px]
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
                ================================================= */}

            <div className="hidden items-center gap-1 lg:flex">
              {mainNavigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative
                      rounded-full
                      px-3
                      py-2
                      text-sm
                      font-medium
                      transition-colors
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

                    {active && (
                      <span
                        className="
                          absolute
                          inset-x-3
                          -bottom-0.5
                          h-0.5
                          rounded-full
                          bg-primary
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* =================================================
                DESKTOP CTA
                ================================================= */}

            <div className="hidden lg:block">
              <Button
                href={navigationCta.href}
                size="md"
                className="px-6"
              >
                {navigationCta.label}
              </Button>
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
                ================================================= */}

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-border
                bg-white
                text-secondary
                shadow-sm
                transition
                hover:bg-primary-light
                hover:text-primary
                lg:hidden
              "
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* =================================================
              MOBILE MENU
              ================================================= */}

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
                border-white/70
                bg-white/95
                p-3
                shadow-[0_12px_40px_rgba(24,59,59,0.12)]
                backdrop-blur-xl
              "
            >
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
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-border pt-3">
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

      {/* =====================================================
          HEADER SPACING

          Prevents page content from going behind fixed navbar.
          ===================================================== */}

      <div className="h-[84px] sm:h-[92px] lg:h-[108px]" />
    </>
  );
}