"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

import {
  marriageServices,
  type CounsellingType,
} from "@/data/home";

interface MarriageServiceCardProps {
  service: CounsellingType;
  compact?: boolean;
}

export default function MarriageServiceCard({
  service,
  compact = false,
}: MarriageServiceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-0">
      {/* =====================================================
          MARRIAGE CARD
          ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        className={`
          group
          flex
          min-w-0
          items-center
          border
          border-white/60
          bg-white/75
          text-left
          shadow-sm
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white/90

          ${
            compact
              ? "h-6 w-[125px] gap-1 rounded-md px-1"
              : "w-full gap-2.5 rounded-[18px] px-3 py-2.5"
          }
        `}
      >
        {/* =================================================
            ICON
            ================================================= */}

        <div
          className={`
            flex
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-primary
            shadow-sm
            transition-all
            duration-300

            ${
              compact
                ? "h-4 w-4"
                : "h-9 w-9"
            }
          `}
        >
          <HeartHandshake
            className={
              compact
                ? "h-2 w-2"
                : "h-4.5 w-4.5"
            }
            strokeWidth={1.8}
          />
        </div>

        {/* =================================================
            TEXT
            ================================================= */}

        <div className="min-w-0 flex-1 leading-none">
          <p
            className={`
              truncate
              font-bold
              text-secondary

              ${
                compact
                  ? "text-[6px]"
                  : "text-xs xl:text-sm"
              }
            `}
          >
            {service.title}
          </p>

          <p
            className={`
              truncate
              text-slate-600

              ${
                compact
                  ? "mt-0.5 text-[5px]"
                  : "mt-0.5 text-[10px] xl:text-xs"
              }
            `}
          >
            {service.subtitle}
          </p>
        </div>

        {/* =================================================
            ARROW
            ================================================= */}

        <ArrowRight
          className={`
            shrink-0
            text-primary
            transition-transform
            duration-300

            ${
              compact
                ? "h-2 w-2"
                : "h-3.5 w-3.5"
            }

            ${open ? "rotate-90" : ""}
          `}
        />
      </button>

      {/* =====================================================
          SUBMENU
          ===================================================== */}

      {open && (
        <div
          className={`
            z-50
            rounded-xl
            border
            border-white/70
            bg-white/95
            shadow-xl
            backdrop-blur-xl

            ${
              compact
                ? `
                  absolute
                  left-0
                  top-[calc(100%+4px)]
                  w-[165px]
                  p-1
                `
                : `
                  absolute
                  left-[calc(100%+10px)]
                  top-0
                  w-[250px]
                  p-2
                `
            }
          `}
        >
          {/* =================================================
              TITLE
              ================================================= */}

          <div
            className={`
              border-b
              border-slate-200

              ${
                compact
                  ? "px-2 pb-1 pt-1"
                  : "px-3 pb-2 pt-1"
              }
            `}
          >
            <p
              className={`
                font-bold
                text-secondary

                ${
                  compact
                    ? "text-[8px]"
                    : "text-xs"
                }
              `}
            >
              Marriage Counselling
            </p>

            <p
              className={`
                text-slate-500

                ${
                  compact
                    ? "mt-0.5 text-[6px]"
                    : "mt-0.5 text-[10px]"
                }
              `}
            >
              Choose the support you need
            </p>
          </div>

          {/* =================================================
              OPTIONS
              ================================================= */}

          <div className="mt-1">
            {marriageServices.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  group/item
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  font-medium
                  text-slate-700
                  transition-colors
                  duration-200
                  hover:bg-primary/10
                  hover:text-primary

                  ${
                    compact
                      ? "gap-1 px-2 py-1.5 text-[7px]"
                      : "gap-2 px-3 py-2.5 text-xs"
                  }
                `}
              >
                <span className="min-w-0">
                  {item.title}
                </span>

                <ArrowRight
                  className={`
                    shrink-0
                    opacity-0
                    transition-all
                    duration-200
                    group-hover/item:translate-x-1
                    group-hover/item:opacity-100

                    ${
                      compact
                        ? "h-2.5 w-2.5"
                        : "h-3.5 w-3.5"
                    }
                  `}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}