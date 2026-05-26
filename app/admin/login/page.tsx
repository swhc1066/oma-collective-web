import { login } from "../actions";

type SearchParams = Promise<{ next?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next, error } = await searchParams;

  const errorMessage =
    error === "invalid"
      ? "Wrong password."
      : error === "config"
      ? "Admin is not configured. Set ADMIN_PASSWORD."
      : null;

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <header className="mb-8 text-center">
          <p className="font-display text-xs tracking-[0.35em] uppercase text-stone-500">
            Collective &apos;26
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-wide text-stone-900">
            Admin Login
          </h1>
        </header>

        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="next" value={next ?? "/admin"} />
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-stone-700">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-[var(--color-bg-maroon)] focus:ring-1 focus:ring-[var(--color-bg-maroon)]"
            />
          </label>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-md bg-[var(--color-bg-maroon)] px-4 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)]"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
