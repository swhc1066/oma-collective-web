/**
 * Shared-password session token for the admin area.
 *
 * Format: `<expiresMs>.<hmacHex>` where the HMAC is SHA-256 over `expiresMs`
 * keyed by `ADMIN_PASSWORD`. Verifying re-derives the HMAC and constant-time
 * compares it. Rotating `ADMIN_PASSWORD` invalidates all existing sessions.
 *
 * Web Crypto only so this module works in both Node and Edge (middleware).
 */

const enc = new TextEncoder();
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const SESSION_COOKIE = "oma_admin_session";

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(
  secret: string,
  ttlMs: number = DEFAULT_TTL_MS,
): Promise<{ token: string; expires: Date }> {
  const expiresMs = Date.now() + ttlMs;
  const mac = await hmacHex(secret, String(expiresMs));
  return { token: `${expiresMs}.${mac}`, expires: new Date(expiresMs) };
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, mac] = token.split(".");
  if (!expiresStr || !mac) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  const expected = await hmacHex(secret, expiresStr);
  if (expected.length !== mac.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ mac.charCodeAt(i);
  }
  return diff === 0;
}
