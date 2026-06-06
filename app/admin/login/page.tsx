"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

function loginErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "Wrong email or password.";
  }
  if (lower.includes("too many requests") || lower.includes("rate limit")) {
    return "Too many attempts. Wait a moment and try again.";
  }
  return message;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(loginErrorMessage(signInError.message));
      setStatus("idle");
      return;
    }

    router.push("/admin");
    router.refresh();
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

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-stone-700">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
            disabled={status === "submitting"}
            className="mt-2 rounded-md bg-[var(--color-bg-maroon)] px-4 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)] disabled:opacity-60"
          >
            {status === "submitting" ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
