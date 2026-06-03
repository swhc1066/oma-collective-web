"use server";

/**
 * Server actions for the auction admin. Every write runs through the
 * cookie-aware Supabase server client, so it executes AS the signed-in admin
 * (RLS grants authenticated users full CRUD). The service-role key is never
 * used. Each mutation revalidates the public /auction page.
 *
 * Image handling: the client compresses the file with browser-image-compression
 * (max 1600px, 80% quality) and sends the already-small file here as `image`.
 * This action only uploads the bytes to the `auction-images` bucket and stores
 * the resulting public URL in `auction_lots.image_url`.
 */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "auction-images";

type ActionResult = { error: string } | void;

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Parse the value field: empty → null ("Priceless"), otherwise a number. */
function parseValue(fd: FormData): number | null {
  const raw = str(fd, "value").replace(/[$,]/g, "");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function parseOrder(fd: FormData): number {
  const n = Number(str(fd, "display_order"));
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

function parseStatus(fd: FormData): "draft" | "published" {
  return str(fd, "status") === "published" ? "published" : "draft";
}

/** Derive the storage object path from a public URL so we can delete it. */
function storagePathFromUrl(url: string | null): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  return idx === -1 ? null : url.slice(idx + marker.length);
}

async function getAuthedClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
): Promise<string> {
  const ext = (file.name.split(".").pop() || "webp").toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || "image/webp",
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function getImageFile(fd: FormData): File | null {
  const v = fd.get("image");
  return v instanceof File && v.size > 0 ? v : null;
}

export async function createLot(formData: FormData): Promise<ActionResult> {
  const supabase = await getAuthedClient();

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  let image_url: string | null = null;
  const file = getImageFile(formData);
  if (file) {
    try {
      image_url = await uploadImage(supabase, file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  }

  const { error } = await supabase.from("auction_lots").insert({
    title,
    description: str(formData, "description") || null,
    value: parseValue(formData),
    donor: str(formData, "donor") || null,
    image_url,
    display_order: parseOrder(formData),
    status: parseStatus(formData),
  });
  if (error) return { error: error.message };

  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateLot(formData: FormData): Promise<ActionResult> {
  const supabase = await getAuthedClient();

  const id = str(formData, "id");
  if (!id) return { error: "Missing lot id." };

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  const { data: existing, error: fetchError } = await supabase
    .from("auction_lots")
    .select("image_url")
    .eq("id", id)
    .single();
  if (fetchError) return { error: fetchError.message };

  let image_url: string | null = existing?.image_url ?? null;
  const file = getImageFile(formData);
  const removeImage = formData.get("removeImage") === "1";

  if (file) {
    try {
      const uploaded = await uploadImage(supabase, file);
      const oldPath = storagePathFromUrl(image_url);
      if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath]);
      image_url = uploaded;
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." };
    }
  } else if (removeImage && image_url) {
    const oldPath = storagePathFromUrl(image_url);
    if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath]);
    image_url = null;
  }

  const { error } = await supabase
    .from("auction_lots")
    .update({
      title,
      description: str(formData, "description") || null,
      value: parseValue(formData),
      donor: str(formData, "donor") || null,
      image_url,
      display_order: parseOrder(formData),
      status: parseStatus(formData),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}

// Invoked directly as a <form action>, so it returns void and throws on
// failure (surfaced by the nearest error boundary) rather than a result object.
export async function deleteLot(formData: FormData): Promise<void> {
  const supabase = await getAuthedClient();

  const id = str(formData, "id");
  if (!id) redirect("/admin");

  const { data: existing } = await supabase
    .from("auction_lots")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("auction_lots").delete().eq("id", id);
  if (error) throw new Error(error.message);

  const path = storagePathFromUrl(existing?.image_url ?? null);
  if (path) await supabase.storage.from(BUCKET).remove([path]);

  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
