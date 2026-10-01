"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { changeCounsellorPassword } from "@/services/counsellor/counsellor.api";

type PasswordField = "current" | "new" | "confirm";

export default function CounsellorSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePassword = (field: PasswordField) => {
    setShowPassword((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage(
        "New password must be different from your current password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await changeCounsellorPassword({
        currentPassword,
        newPassword,
      });

      setSuccessMessage(response.message || "Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to change password. Please try again.";

      setErrorMessage(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    field: PasswordField,
    placeholder: string,
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword[field] ? "text" : "password"}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          disabled={loading}
          autoComplete={
            field === "current" ? "current-password" : "new-password"
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        <button
          type="button"
          onClick={() => togglePassword(field)}
          disabled={loading}
          aria-label={showPassword[field] ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          {showPassword[field] ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account and security settings.
          </p>
        </div>

        {/* Security Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <LockKeyhole className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Security
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                  Keep your account secure by updating your password.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            {/* Success */}
            {successMessage && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{successMessage}</p>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
              {renderPasswordInput(
                "Current Password",
                currentPassword,
                setCurrentPassword,
                "current",
                "Enter your current password",
              )}

              {renderPasswordInput(
                "New Password",
                newPassword,
                setNewPassword,
                "new",
                "Enter your new password",
              )}

              {renderPasswordInput(
                "Confirm New Password",
                confirmPassword,
                setConfirmPassword,
                "confirm",
                "Confirm your new password",
              )}

              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium text-gray-600">
                  Password requirements
                </p>

                <ul className="mt-2 space-y-1 text-xs text-gray-500">
                  <li>• Minimum 8 characters</li>
                  <li>• Must be different from your current password</li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
