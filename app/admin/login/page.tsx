"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(
    callbackError === "auth"
      ? "That sign-in link expired or was already used. Request a new one."
      : null,
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

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

        {status === "sent" ? (
          <div
            role="status"
            className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
          >
            <p className="font-display text-lg tracking-wide text-stone-900">
              Check your email
            </p>
            <p className="mt-3 text-sm text-stone-600">
              We sent a sign-in link to{" "}
              <span className="font-medium text-stone-900">{email}</span>. Open
              it on this device to continue.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 font-display text-xs tracking-[0.25em] uppercase text-stone-600 underline-offset-4 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-stone-700">Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-[var(--color-bg-maroon)] focus:ring-1 focus:ring-[var(--color-bg-maroon)]"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 rounded-md bg-[var(--color-bg-maroon)] px-4 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
