export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://backend-social-councelling.vercel.app"
    : "http://localhost:3001");
