/**
 * Session refresh + /admin guard for middleware.
 *
 * Refreshes the Supabase auth cookies on every matched request, then gates
 * /admin/*: no session OR a session whose email !== ALLOWED_ADMIN_EMAIL is
 * redirected to /admin/login. /admin/login itself stays public.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run logic between createServerClient and getUser() — it refreshes
  // the session token and is what keeps the user signed in.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // The sign-in page must stay reachable while signed out.
  if (pathname === "/admin/login") {
    return response;
  }

  const allowed = process.env.ALLOWED_ADMIN_EMAIL?.toLowerCase();
  const email = user?.email?.toLowerCase();
  if (!user || !allowed || email !== allowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
