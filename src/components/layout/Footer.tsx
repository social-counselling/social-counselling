import Link from "next/link";

import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-white">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-xl font-bold tracking-[0.14em]">
                SOCIAL
              </div>

              <div className="mt-1 text-xs font-semibold tracking-[0.24em] text-white/70">
                COUNSELLING
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              A safe and supportive space where you can be heard,
              understood, and guided toward a clearer path forward.
            </p>

            <Button
              href="/book-session"
              variant="primary"
              size="sm"
              className="mt-6"
            >
              Book a Session
            </Button>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-white/70 transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                href="/counsellors"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Counsellors
              </Link>

              <Link
                href="/services"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/contact"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">
              Resources
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/resources"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Resources
              </Link>

              <Link
                href="/blog"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Blog
              </Link>

              <Link
                href="/privacy-policy"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/70">
              <p>hello@socialcounselling.com</p>
              <p>+91 98765 43210</p>
              <p>Mon – Sat · 9:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/50">
            © {new Date().getFullYear()} Social Counselling. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}