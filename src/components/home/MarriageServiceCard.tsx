"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div
      className="relative min-w-0"
      onMouseEnter={() => {
        if (!compact) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!compact) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (compact) {
            setOpen((previous) => !previous);
          }
        }}
        aria-expanded={open}
        className={`
          group
          flex
          w-full
          min-w-0
          items-center
          border
          border-white/70
          bg-white/75
          backdrop-blur-md
          shadow-[0_6px_20px_rgba(24,59,59,0.08)]
          text-left
          transition-all
          duration-300
          hover:bg-white/90
          hover:shadow-[0_10px_30px_rgba(24,59,59,0.14)]

          ${
            compact
              ? `
                min-h-[64px]
                gap-2
                rounded-[18px]
                px-2
                py-2
              `
              : `
                min-h-[82px]
                gap-3
                rounded-[22px]
                px-3
                py-2.5
              `
          }
        `}
      >
        {/* Icon */}
        <div
          className={`
            relative
            flex
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            bg-white
            shadow-sm

            ${
              compact
                ? "h-11 w-11"
                : "h-[58px] w-[58px]"
            }
          `}
        >
          <Image
            src="/images/icons/marriage.png"
            alt=""
            width={80}
            height={80}
            className="
              h-full
              w-full
              object-contain
              p-1
            "
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p
            className={`
              font-semibold
              leading-tight
              text-secondary

              ${
                compact
                  ? "line-clamp-2 text-[10px]"
                  : "text-sm xl:text-[15px]"
              }
            `}
          >
            {service.title}
          </p>

          <p
            className={`
              mt-1
              leading-tight
              text-slate-600

              ${
                compact
                  ? "line-clamp-2 text-[8px]"
                  : "line-clamp-2 text-[11px] xl:text-xs"
              }
            `}
          >
            {service.subtitle}
          </p>
        </div>

        {/* Arrow — hidden on compact/mobile */}
        {!compact && (
          <ArrowRight
            className={`
              h-4
              w-4
              shrink-0
              text-primary
              transition-all
              duration-300
              ${
                open
                  ? "translate-x-1 rotate-90"
                  : ""
              }
            `}
          />
        )}
      </button>

      {/* Marriage submenu */}
      {open && (
        <div
          className={`
            absolute
            z-50
            rounded-xl
            border
            border-white/70
            bg-white/95
            shadow-xl
            backdrop-blur-xl

            ${
              compact
                ? "left-0 top-[calc(100%+4px)] w-full p-1"
                : "left-[calc(100%+8px)] top-0 w-[250px] p-2"
            }
          `}
        >
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
                mt-0.5
                text-slate-500
                ${
                  compact
                    ? "text-[6px]"
                    : "text-[10px]"
                }
              `}
            >
              Choose the support you need
            </p>
          </div>

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