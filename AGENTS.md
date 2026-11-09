<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

HireLoop job-board frontend: Next.js 16 App Router, React 19, Tailwind v4, shadcn `base-nova` built on Base UI, Better Auth with MongoDB Atlas.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` and `npm run typecheck` are the only automated checks. No test runner or CI workflow exists; run both after changes.
- `npm run format` rewrites `**/*.{ts,tsx}` with Prettier (no semicolons, double quotes, Tailwind class sorting). Existing files are not fully formatted, so formatting unrelated files creates noise.

## Architecture

- `app/layout.tsx` wraps every page in `ThemeProvider` + `Navbar`; `app/page.tsx` is the hero landing page.
- Auth screens live in the `app/(auth)` route group (`/sign-in`, `/sign-up`). Add new auth screens there.
- Server auth config: `lib/auth.ts` (module-scope `MongoClient`, database `hireloopdb`). Browser client: `lib/auth-client.ts`. Route handler: `app/api/auth/[...all]/route.ts`.
- `@/*` maps to the repo root (there is no `src/`), e.g. `@/components/ui/button`, `@/lib/auth`.
- Tailwind v4 is CSS-first: tokens and theme live in `app/globals.css`; there is no `tailwind.config.*`.

## Gotchas

- UI primitives use Base UI, not Radix. For link-buttons use `render={<Link href="..." />}` plus `nativeButton={false}`; there is no `asChild` prop.
- `components/ui/*` import `cn` from the `cn` package; `@/lib/utils` only re-exports it.
- `.env` is gitignored but contains live Atlas credentials. Never print, commit, or change those values without asking. `lib/auth.ts` also reads `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`, which are missing from `.env`, so Google sign-in is configured but non-functional.
- `lib/auth-client.ts` re-exports `signIn` / `signUp` / `useSession` from the configured `authClient`, which uses `inferAdditionalFields<typeof auth>()` so client types match server fields. Its `baseURL` uses `BETTER_AUTH_URL` (not `NEXT_PUBLIC_*`), so it is `undefined` in the browser and falls back to same-origin.
- Sign-up sends `role` (`seeker` | `recruiter` | `admin`) as a Better Auth additional field; sign-in still only `console.log`s results. No loading state, redirect after auth, session-aware navbar, or sign-out yet.
- `user.additionalFields.role` is `input: true` with `defaultValue: "seeker"`; the sign-up form lets the user pick `admin` too.
- Navbar and forms link to routes that do not exist yet: `/jobs`, `/companies`, `/pricing`, `/forgot-password`, `/terms`, `/privacy`. Expect 404s; create the pages rather than removing links unless asked.
- Next.js 16 renamed Middleware to Proxy (`proxy.ts`, export `proxy`). Read the bundled docs in `node_modules/next/dist/docs/` before using framework APIs that may have changed.
