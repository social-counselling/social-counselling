"use client";

import { useEffect, useState } from "react";
import { Loader2, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  requestOtp,
  verifyOtp,
  type OtpPurpose,
  type VerifyLoginOtpResponse,
  type VerifyBookingOtpResponse,
} from "@/services/auth/auth.api";

interface EmailOtpDialogProps {
  open: boolean;
  email: string;
  purpose: OtpPurpose;
  onOpenChange: (open: boolean) => void;
  onVerified: (
    result: VerifyLoginOtpResponse | VerifyBookingOtpResponse,
  ) => void;
}

export default function EmailOtpDialog({
  open,
  email,
  purpose,
  onOpenChange,
  onVerified,
}: EmailOtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!open) {
      setOtp("");
      setError("");
      setSeconds(60);
      setLoading(false);
      setResending(false);
      return;
    }

    setOtp("");
    setError("");
    setSeconds(60);
  }, [open, email, purpose]);

  useEffect(() => {
    if (!open || seconds <= 0) return;

    const timer = window.setInterval(() => {
      setSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [open, seconds]);

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await verifyOtp({
        email,
        otp,
        purpose,
      });

      onVerified(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to verify OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (seconds > 0 || resending) return;

    try {
      setResending(true);
      setError("");
      setOtp("");

      const response = await requestOtp({
        email,
        purpose,
      });

      setSeconds(response.resendAfter || 60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resend OTP.");
    } finally {
      setResending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!loading}>
        <DialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>

          <DialogTitle className="text-xl font-semibold text-secondary">
            Verify your email
          </DialogTitle>

          <DialogDescription>
            Enter the six-digit verification code sent to your email.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <MailCheck className="size-5 shrink-0 text-primary" />

          <p className="break-all text-sm font-medium text-secondary">
            {email}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label
              htmlFor="email-otp"
              className="mb-2 block text-sm font-medium text-secondary"
            >
              Enter OTP
            </label>

            <input
              id="email-otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) => {
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              placeholder="Enter 6-digit code"
              disabled={loading}
              autoFocus
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-center text-lg font-semibold tracking-[0.5em] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {otp.length}/6 digits
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1 text-sm">
          <span className="text-gray-500">Didn't receive the code?</span>

          <button
            type="button"
            onClick={handleResend}
            disabled={seconds > 0 || resending || loading}
            className="font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {resending ? (
              <span className="inline-flex items-center gap-1">
                <RefreshCw className="size-3 animate-spin" />
                Sending...
              </span>
            ) : seconds > 0 ? (
              `Resend in ${seconds}s`
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
