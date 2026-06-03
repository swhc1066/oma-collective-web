import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};

export function proxy(request: NextRequest) {
  return updateSession(request);
}
