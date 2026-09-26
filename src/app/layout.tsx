import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Social Counselling",
    template: "%s | Social Counselling",
  },
  description:
    "Professional counselling and emotional wellbeing support in a safe, confidential, and compassionate environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
