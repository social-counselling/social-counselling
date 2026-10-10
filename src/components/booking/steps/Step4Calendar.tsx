"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CalendarDays, Check, Clock, Loader2 } from "lucide-react";

import type {
  BookingAvailabilityResponse,
  BookingAvailabilitySlot,
} from "@/types/booking";

import { getBookingAvailability } from "@/services/booking/booking.api";

interface Step4CalendarProps {
  counsellorId: number | null;
  counsellorName: string;
  selectedSlotId: number | null;
  selectedDate: string;

  onSelectSlot: (slotId: number | null, date: string) => void;
}

/*
 * ----------------------------------------------------
 * Date helpers
 * ----------------------------------------------------
 */

function getLocalDateString(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLabel(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);

  return {
    day: date.toLocaleDateString("en-IN", {
      weekday: "short",
    }),

    date: date.toLocaleDateString("en-IN", {
      day: "numeric",
    }),

    month: date.toLocaleDateString("en-IN", {
      month: "short",
    }),
  };
}

function formatFullDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return time;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/*
 * ----------------------------------------------------
 * Generate 14 dates
 * ----------------------------------------------------
 */

function generateDateRange(startDate: string) {
  const result: string[] = [];

  const start = new Date(`${startDate}T00:00:00`);

  for (let index = 0; index < 14; index++) {
    const date = new Date(start);

    date.setDate(start.getDate() + index);

    result.push(getLocalDateString(date));
  }

  return result;
}

export default function Step4Calendar({
  counsellorId,
  counsellorName,
  selectedSlotId,
  selectedDate,
  onSelectSlot,
}: Step4CalendarProps) {
  /*
   * ----------------------------------------------------
   * Today
   * ----------------------------------------------------
   */

  const today = useMemo(() => getLocalDateString(new Date()), []);

  /*
   * ----------------------------------------------------
   * Selected / active date
   * ----------------------------------------------------
   */

  const [activeDate, setActiveDate] = useState<string>(selectedDate || today);

  /*
   * ----------------------------------------------------
   * Starting date of 14-day window
   *
   * Clicking a date inside the row does NOT
   * change this.
   *
   * Choosing from calendar DOES change this.
   * ----------------------------------------------------
   */

  const [rangeStartDate, setRangeStartDate] = useState<string>(
    selectedDate || today,
  );

  /*
   * ----------------------------------------------------
   * Native calendar
   * ----------------------------------------------------
   */

  const dateInputRef = useRef<HTMLInputElement>(null);

  /*
   * ----------------------------------------------------
   * Availability
   * ----------------------------------------------------
   */

  const [availability, setAvailability] =
    useState<BookingAvailabilityResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /*
   * ----------------------------------------------------
   * Fixed 14-day range
   * ----------------------------------------------------
   */

  const dates = useMemo(
    () => generateDateRange(rangeStartDate),
    [rangeStartDate],
  );

  /*
   * ----------------------------------------------------
   * Load availability
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!counsellorId || !activeDate) {
      return;
    }

    const loadAvailability = async () => {
      try {
        setLoading(true);
        setError(null);
        setAvailability(null);
        const response = await getBookingAvailability(counsellorId, activeDate);

        setAvailability(response);
      } catch (error) {
        console.error("Failed to load availability:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load available slots.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [counsellorId, activeDate]);

  /*
   * ----------------------------------------------------
   * Open calendar
   * ----------------------------------------------------
   */

  const openCalendar = () => {
    const input = dateInputRef.current;

    if (!input) {
      return;
    }

    const pickerInput = input as HTMLInputElement & {
      showPicker?: () => void;
    };

    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker();
      return;
    }

    input.focus();
    input.click();
  };

  /*
   * ----------------------------------------------------
   * Calendar selection
   *
   * This changes the starting date of
   * the 14-day window.
   * ----------------------------------------------------
   */

  const handleCalendarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;

    if (!date) {
      return;
    }

    setActiveDate(date);

    setRangeStartDate(date);

    onSelectSlot(null, date);
  };

  /*
   * ----------------------------------------------------
   * Date row selection
   *
   * IMPORTANT:
   *
   * Does NOT change rangeStartDate.
   * ----------------------------------------------------
   */

  const handleDateSelect = (date: string) => {
    setActiveDate(date);

    onSelectSlot(null, date);
  };

  /*
   * ----------------------------------------------------
   * Slot selection
   * ----------------------------------------------------
   */

  const handleSlotSelect = (slot: BookingAvailabilitySlot) => {
    onSelectSlot(slot.counsellorSlotId, activeDate);
  };

  return (
    /*
     * IMPORTANT:
     *
     * This component is now constrained.
     * It cannot make the booking card grow.
     */

    <section
      className="
        flex
        h-full
        min-h-0
        w-full
        max-h-[520px]
        flex-col
        overflow-hidden
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="shrink-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Step 4 of 8
        </p>

        <h1 className="mt-2 text-2xl font-semibold leading-tight text-secondary sm:text-3xl">
          Select Date & Time
        </h1>

        <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
          Choose a convenient date and available time for your session with{" "}
          <span className="font-semibold text-secondary">{counsellorName}</span>
          .
        </p>
      </div>

      {/* =================================================
          DATE AREA
      ================================================= */}

      <div className="mt-4 shrink-0">
        {/* Select date header */}

        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />

            <h2 className="text-xs font-semibold text-secondary">
              Select a date
            </h2>
          </div>

          {/* Choose date */}

          <div className="relative">
            <button
              type="button"
              onClick={openCalendar}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-primary/30
                bg-primary/[0.04]
                px-2.5
                py-1.5
                text-[11px]
                font-semibold
                text-primary
                transition
                hover:border-primary
                hover:bg-primary/[0.08]
              "
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Choose date
            </button>

            <input
              ref={dateInputRef}
              type="date"
              value={activeDate}
              min={today}
              onChange={handleCalendarChange}
              className="
                pointer-events-none
                absolute
                h-0
                w-0
                opacity-0
              "
              tabIndex={-1}
            />
          </div>
        </div>

        {/* =================================================
            SELECTED DATE
        ================================================= */}

        <div
          className="
            mb-2
            rounded-lg
            bg-primary/[0.04]
            px-3
            py-1.5
          "
        >
          <p className="text-[9px] text-slate-500">Selected date</p>

          <p className="mt-0.5 text-xs font-semibold text-secondary">
            {formatFullDate(activeDate)}
          </p>
        </div>

        {/* =================================================
            14 DATE ROW
        ================================================= */}

        <div
          className="
            flex
            gap-1.5
            overflow-x-auto
            pb-1
            scrollbar-thin
          "
        >
          {dates.map((date) => {
            const formatted = formatDateLabel(date);

            const selected = activeDate === date;

            return (
              <button
                key={date}
                type="button"
                onClick={() => handleDateSelect(date)}
                className={`
                  min-w-[58px]
                  shrink-0
                  rounded-lg
                  border
                  px-1.5
                  py-1.5
                  text-center
                  transition-all
                  duration-200

                  ${
                    selected
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:bg-primary/[0.03]"
                  }
                `}
              >
                <span
                  className={`
                    block
                    text-[9px]
                    font-medium

                    ${selected ? "text-white/80" : "text-slate-400"}
                  `}
                >
                  {formatted.day}
                </span>

                <span className="mt-0.5 block text-sm font-semibold">
                  {formatted.date}
                </span>

                <span
                  className={`
                    block
                    text-[9px]

                    ${selected ? "text-white/80" : "text-slate-400"}
                  `}
                >
                  {formatted.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          TIME SLOTS
          
          THIS IS THE ONLY VERTICAL SCROLL AREA.
      ================================================= */}

      <div
        className="
          mt-3
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {/* Heading */}

        <div className="mb-2 flex shrink-0 items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />

          <h2 className="text-xs font-semibold text-secondary">
            Available time slots
          </h2>
        </div>

        {/* =================================================
            SCROLLABLE SLOT AREA
        ================================================= */}

        <div
          className="
            h-full
            min-h-0
            overflow-y-auto
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            pr-1
          "
        >
          {/* Loading */}

          {loading && (
            <div className="flex min-h-[100px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-center">
                <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />

                <p className="mt-2 text-[11px] text-slate-500">
                  Loading available slots...
                </p>
              </div>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center">
              <p className="text-[11px] font-medium text-red-700">
                Unable to load available slots.
              </p>

              <p className="mt-1 text-[10px] text-red-600">{error}</p>
            </div>
          )}

          {/* No slots */}

          {!loading &&
            !error &&
            availability &&
            availability.data.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <CalendarDays className="mx-auto h-5 w-5 text-slate-400" />

                <p className="mt-2 text-[11px] font-medium text-slate-600">
                  No slots available
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Please select another date.
                </p>
              </div>
            )}

          {/* =================================================
              SLOTS
          ================================================= */}

          {!loading &&
            !error &&
            availability &&
            availability.data.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5">
                {availability.data.map((slot) => {
                  const selected = selectedSlotId === slot.counsellorSlotId;

                  return (
                    <button
                      key={slot.counsellorSlotId}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                          relative
                          rounded-lg
                          border
                          px-1.5
                          py-1.5
                          text-center
                          transition-all
                          duration-200

                          ${
                            selected
                              ? "border-primary bg-primary/[0.06] text-primary shadow-sm"
                              : "border-slate-200 bg-white text-secondary hover:border-primary/50 hover:bg-primary/[0.03]"
                          }
                        `}
                    >
                      {/* Selected */}

                      {selected && (
                        <span
                          className="
                              absolute
                              right-1
                              top-1
                              flex
                              h-3.5
                              w-3.5
                              items-center
                              justify-center
                              rounded-full
                              bg-primary
                            "
                        >
                          <Check className="h-2 w-2 text-white" />
                        </span>
                      )}

                      <Clock
                        className={`
                            mx-auto
                            h-3
                            w-3

                            ${selected ? "text-primary" : "text-slate-400"}
                          `}
                      />

                      <span className="mt-0.5 block text-[11px] font-semibold">
                        {formatTime(slot.startTime)}
                      </span>

                      <span className="mt-0.5 block text-[8px] text-slate-400">
                        to {formatTime(slot.endTime)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <p
        className="
          mt-2
          shrink-0
          text-[10px]
          text-slate-500
        "
      >
        Select one available time slot to continue.
      </p>
    </section>
  );
}
