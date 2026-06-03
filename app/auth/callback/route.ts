/**
 * Magic-link callback. Exchanges the one-time code (set by signInWithOtp) for a
 * session, persists the auth cookies, and sends the admin on to /admin.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const dest = next.startsWith("/admin") ? next : "/admin";
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth`);
}
