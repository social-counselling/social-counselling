
/**
 * Slot values represent clock times, not real-world timestamps.
 *
 * Backend ISO representation:
 * 1970-01-01T16:00:00.000Z
 *
 * Intended clock time:
 * 16:00 IST
 */
export function formatSlotTime(value: string): string {
  if (!value) return "—";

  let hours: number;
  let minutes: number;

  // Support plain HH:mm values as well as the current ISO API format.
  const clockMatch = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/);

  if (clockMatch) {
    hours = Number(clockMatch[1]);
    minutes = Number(clockMatch[2]);
  } else {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    // Read the clock fields without applying the browser timezone.
    hours = date.getUTCHours();
    minutes = date.getUTCMinutes();
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * Convert a slot value to the HH:mm value required by <input type="time">.
 */
export function formatSlotTimeInput(value: string): string {
  if (!value) return "";

  const clockMatch = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/);

  if (clockMatch) return `${clockMatch[1]}:${clockMatch[2]}`;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(
    date.getUTCMinutes(),
  ).padStart(2, "0")}`;
}
    