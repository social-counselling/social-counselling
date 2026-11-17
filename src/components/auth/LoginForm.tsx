"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";

import {
  login,
  requestOtp,
  type AuthUser,
  type VerifyLoginOtpResponse,
  type VerifyBookingOtpResponse,
} from "@/services/auth/auth.api";

import { setAccessToken } from "@/lib/auth/auth-storage";
import EmailOtpDialog from "@/components/auth/EmailOtpDialog";

type LoginFormProps = {
  redirectTo?: string;
};

type LoginMethod = "PASSWORD" | "OTP";

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [method, setMethod] = useState<LoginMethod>("PASSWORD");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const [error, setError] = useState("");

  function redirectUser(user: AuthUser) {
    if (redirectTo) {
      router.replace(redirectTo);
      return;
    }

    switch (user.role) {
      case "ADMIN":
        router.replace("/admin");
        return;

      case "COUNSELLOR":
        router.replace("/counsellor");
        return;

      case "CLIENT":
        router.replace("/client");
        return;

      default:
        setError("Your account role is not supported.");
    }
  }

  function handleSuccessfulLogin(user: AuthUser, accessToken: string) {
    setAccessToken(accessToken);
    setError("");
    setOtpDialogOpen(false);

    redirectUser(user);
  }

  async function handlePasswordLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email: email.trim(),
        password,
      });

      handleSuccessfulLogin(response.user, response.accessToken);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRequestOtp() {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await requestOtp({
        email: email.trim(),
        purpose: "LOGIN",
      });

      setOtpDialogOpen(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleOtpVerified(
    result: VerifyLoginOtpResponse | VerifyBookingOtpResponse,
  ) {
    if (!("accessToken" in result)) {
      setError("Unable to complete login. Please try again.");
      return;
    }

    handleSuccessfulLogin(result.user, result.accessToken);
  }

  return (
    <>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        {/* HEADER */}
        <div className="mb-7">
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>

          <h1 className="text-2xl font-semibold text-secondary">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue to your account.
          </p>
        </div>

        {/* LOGIN METHOD SWITCH */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMethod("PASSWORD");
              setError("");
            }}
            disabled={loading}
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              method === "PASSWORD"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-secondary"
            }`}
          >
            <Lock className="size-4" />
            Password
          </button>

          <button
            type="button"
            onClick={() => {
              setMethod("OTP");
              setError("");
            }}
            disabled={loading}
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              method === "OTP"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-secondary"
            }`}
          >
            <Mail className="size-4" />
            Email OTP
          </button>
        </div>

        {/* EMAIL INPUT */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* PASSWORD LOGIN */}
        {method === "PASSWORD" && (
          <form onSubmit={handlePasswordLogin} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-secondary"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
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
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        )}

        {/* OTP LOGIN */}
        {method === "OTP" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-semibold text-secondary">
                    Passwordless login
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    We'll send a six-digit verification code to your registered
                    email address.
                  </p>
                </div>
              </div>
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
              type="button"
              onClick={handleRequestOtp}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  Send OTP
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* REUSABLE OTP DIALOG */}
      <EmailOtpDialog
        open={otpDialogOpen}
        email={email.trim()}
        purpose="LOGIN"
        onOpenChange={setOtpDialogOpen}
        onVerified={handleOtpVerified}
      />
    </>
  );
}
