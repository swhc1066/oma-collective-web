/**
 * Browser Supabase client (@supabase/ssr). Stores the session in cookies so the
 * server can read it. Used by the email/password sign-in form on /admin/login.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
