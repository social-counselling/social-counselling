"use client";

import { useEffect, useState } from "react";

type InviteDetails = {
  valid: boolean;
  alreadyAccepted: boolean;
  bookingNumber: string;
  clientName?: string | null;
  serviceName?: string;
  expiresAt?: string;
  message?: string;
};

type ApiMessage = {
  message?: string;
  error?: string;
  success?: boolean;
  alreadyAccepted?: boolean;
  inviteAccepted?: boolean;
  bookingNumber?: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://backend-social-councelling.vercel.app"
    : "http://localhost:3001")
).replace(/\/+$/, "");

const INVITE_ACCEPTED_STORAGE_KEY =
  "social-counselling:booking-invite-accepted";

type InviteAcceptedNotice = {
  bookingNumber: string;
  acceptedAt: number;
};

/**
 * Save a short-lived same-browser notice so an already-open booking wizard tab
 * can advance to Step 8. Then navigate this tab to the wizard's Step 8 screen.
 */
function navigateToBookingComplete(bookingNumber?: string | null): boolean {
  const normalizedBookingNumber = bookingNumber?.trim() ?? "";
  const notice: InviteAcceptedNotice = {
    bookingNumber: normalizedBookingNumber,
    acceptedAt: Date.now(),
  };

  try {
    window.localStorage.setItem(
      INVITE_ACCEPTED_STORAGE_KEY,
      JSON.stringify(notice),
    );

    const params = new URLSearchParams({ inviteConfirmed: "1" });
    if (normalizedBookingNumber) {
      params.set("bookingNumber", normalizedBookingNumber);
    }

    window.location.replace(`/book-session?${params.toString()}`);
    return true;
  } catch {
    // If browser storage is unavailable, keep the confirmation page's success view.
    return false;
  }
}

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & ApiMessage;
  if (!response.ok) {
    throw new Error(
      data.message || data.error || "We could not verify this link.",
    );
  }
  return data;
}

export default function AcceptInvitePage() {
  const [token, setToken] = useState("");
  const [details, setDetails] = useState<InviteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const inviteToken =
      new URLSearchParams(window.location.search).get("token") || "";
    setToken(inviteToken);

    if (!inviteToken) {
      setError(
        "This confirmation link is missing its secure token. Please open the link from your booking email.",
      );
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function validate() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/booking/invite/validate?token=${encodeURIComponent(inviteToken)}`,
          { method: "GET", cache: "no-store", signal: controller.signal },
        );
        const data = await readJson<InviteDetails>(response);
        setDetails(data);
        if (
          data.alreadyAccepted &&
          !navigateToBookingComplete(data.bookingNumber)
        ) {
          setCompleted(true);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error
            ? err.message
            : "This confirmation link could not be verified.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void validate();
    return () => controller.abort();
  }, []);

  async function confirmBooking() {
    if (!token || submitting || completed) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/booking/invite/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await readJson<ApiMessage>(response);
      if (!result.success || !result.inviteAccepted) {
        throw new Error(
          result.message || "Your confirmation could not be completed.",
        );
      }
      const bookingNumber = result.bookingNumber || details?.bookingNumber;
      if (!navigateToBookingComplete(bookingNumber)) {
        setCompleted(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Your confirmation could not be completed.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f4] px-4 py-12 text-[#24324a] sm:py-20">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-[#e0e7df] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55745b]">
          SOCIAL COUNSELLING
        </p>

        {loading ? (
          <div className="py-14 text-center" role="status">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[#dce7dc] border-t-[#236b43]" />
            <h1 className="text-xl font-semibold">Verifying your invitation</h1>
            <p className="mt-2 text-sm text-slate-600">
              Please wait while we check your secure confirmation link.
            </p>
          </div>
        ) : completed ? (
          <div className="py-8 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700"
              aria-hidden="true"
            >
              ✓
            </div>
            <h1 className="mt-5 text-2xl font-semibold sm:text-3xl">
              Booking process completed
            </h1>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
              Thank you. Your invitation acceptance has been recorded
              successfully.
            </p>
            {details?.bookingNumber && (
              <div className="mx-auto mt-6 max-w-sm rounded-xl bg-[#f5f8f4] px-4 py-3">
                <p className="text-sm text-slate-500">Booking number</p>
                <p className="mt-1 font-semibold">{details.bookingNumber}</p>
              </div>
            )}
            <p className="mt-6 text-sm text-slate-500">
              You may close this page.
            </p>
          </div>
        ) : error ? (
          <div className="py-8">
            <h1 className="text-2xl font-semibold">
              We could not verify your invitation
            </h1>
            <p className="mt-3 leading-7 text-slate-600">{error}</p>
            <p className="mt-4 text-sm text-slate-500">
              For assistance, please contact Social Counselling Support and
              provide your booking number if available.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8">
              <p className="text-sm font-semibold text-[#55745b]">
                STEP 8 OF 8
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Confirm your booking
              </h1>
              <p className="mt-3 leading-7 text-slate-600">
                You are almost done. Please review the declaration below and
                confirm to complete the final invitation-acceptance step.
              </p>
            </div>

            {details?.bookingNumber && (
              <div className="mt-6 rounded-xl border border-[#e1e8e0] bg-[#f8faf7] p-4">
                <p className="text-sm text-slate-500">Booking number</p>
                <p className="mt-1 font-semibold">{details.bookingNumber}</p>
                {details.serviceName && (
                  <p className="mt-1 text-sm text-slate-600">
                    {details.serviceName}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 rounded-xl border border-[#e1e8e0] p-5">
              <h2 className="font-semibold">Required declaration</h2>
              <p className="mt-3 leading-7 text-slate-700">
                By clicking the “I CONFIRM” button below, I confirm that:
              </p>
              <ol className="mt-3 list-[lower-alpha] space-y-3 pl-5 leading-7 text-slate-700">
                <li>
                  The information provided by me to Social Counselling is true,
                  and any fraudulent or misrepresentation of information may be
                  subject to legal action.
                </li>
                <li>
                  In case the counselee is a minor (under 18 years of age), I am
                  the parent or legal guardian.
                </li>
              </ol>
            </div>

            {error && (
              <p
                className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={() => void confirmBooking()}
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-[#236b43] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#1b5635] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Confirming your booking…"
                : "I CONFIRM — Complete Booking"}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              This action records your confirmation for this booking only.
              Opening this page does not accept the invitation automatically.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
