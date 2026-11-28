import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: "https://7dc6be02f8b3436f9d627feabd5a7adf@logs.farmware.in/4",
    release: "social-counselling@1.0.0",
    tracesSampleRate: 0.01,
});