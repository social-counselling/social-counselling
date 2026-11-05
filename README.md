This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Frontend RBAC implementation notes

## Implemented in this frontend pass

- `GET /auth/me` is typed using the response shape supplied for Admin and Counsellor. The permissions array is read from `response.user.permissions`.
- Admin, Counsellor and the prepared Client route groups use `SharedDashboardShell`.
- Sidebar items are generated from role-specific route configuration and filtered by permissions.
- Dashboard pages are checked against the authenticated role and required view permission in the frontend.
- Existing public pages and the public booking routes remain outside the dashboard shell.
- Client dashboard, bookings and profile screens are scaffolded using the same responsive shell.

## Client backend contract to implement later

The client UI is ready to consume the following backend behavior when client authentication is added:

1. `POST /auth/login` accepts a client account and returns the existing login response shape.
2. `GET /auth/me` returns `user.role: "CLIENT"` and a `permissions` string array, including `dashboard.view` and `bookings.view_own` where granted.
3. `GET /booking/client?page=1&limit=5&status=...` returns the same paginated `BookingListResponse` shape used by the existing admin/counsellor booking screens, restricted to the authenticated client’s own bookings.
4. The backend must enforce permissions and ownership. Frontend navigation/route checks are UX controls, not security boundaries.

The current backend may not yet implement the client login or `/booking/client` endpoint. Until it does, the client dashboard displays an explanatory booking-history state rather than fabricated booking data.

## Existing route compatibility

- Admin routes remain under `/admin`.
- Counsellor routes remain under `/counsellor`.
- Client routes are prepared under `/client`.
- The existing public website and unauthenticated public booking flow are not moved.