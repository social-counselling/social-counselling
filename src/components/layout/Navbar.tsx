"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import { navigationItems } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <Container className="pt-4 sm:pt-5 lg:pt-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex shrink-0 items-center"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm backdrop-blur-sm sm:h-12 sm:w-12">
                <span className="text-lg font-bold">S</span>
              </div>

              <div className="ml-2 hidden sm:block">
                <div className="text-[17px] font-bold leading-none tracking-[0.16em] text-secondary">
                  SOCIAL
                </div>

                <div className="mt-1 text-[11px] font-semibold tracking-[0.24em] text-primary">
                  COUNSELLING
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/70 px-2 py-2 shadow-lg backdrop-blur-md lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:text-primary"
              >
                {item.label}

                {item.label === "Home" && (
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            ))}

            <Button
              href="/book-session"
              size="sm"
              className="ml-1 px-5"
            >
              Book a Session
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-secondary shadow-md backdrop-blur-md lg:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen
              ? "mt-3 max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur-md">
            <nav className="flex flex-col">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-light hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                href="/book-session"
                size="md"
                className="mt-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                Book a Session
              </Button>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}