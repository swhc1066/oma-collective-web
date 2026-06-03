/**
 * Server-side Supabase clients (@supabase/ssr).
 *
 * - `createClient()` is cookie-aware: it carries the signed-in user's session
 *   so server actions and protected pages act AS that user. RLS on
 *   `auction_lots` / the `auction-images` bucket gives authenticated users
 *   full CRUD. The service-role key is never used.
 * - `createStaticClient()` is cookie-free (anonymous). Use it for the public,
 *   cacheable `/auction` read so the page can stay on ISR (`revalidate`) instead
 *   of being forced dynamic by reading request cookies.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `setAll` called from a Server Component, where cookies are
          // read-only. Safe to ignore — middleware refreshes the session.
        }
      },
    },
  });
}

export function createStaticClient() {
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // No session: nothing to persist.
      },
    },
  });
}
