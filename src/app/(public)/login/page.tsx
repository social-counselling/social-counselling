import type { Metadata } from "next";

import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Social Counselling account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-background px-4 py-12">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
