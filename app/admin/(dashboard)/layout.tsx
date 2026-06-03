import Link from "next/link";
import { signOut } from "../actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-[var(--color-bg-maroon)] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/admin"
            className="font-display text-base tracking-[0.3em] uppercase"
          >
            Collective &apos;26 Admin
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="font-display text-xs tracking-[0.3em] uppercase underline-offset-4 hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </>
  );
}
