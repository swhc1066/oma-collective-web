"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  readItems,
  writeItems,
  uploadPhoto,
  deletePhoto,
  type StoredItem,
} from "@/lib/storage/blob";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth/session";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getString(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function requireField(fd: FormData, key: string): string {
  const v = getString(fd, key);
  if (!v) throw new Error(`${key} is required.`);
  return v;
}

function getFile(fd: FormData, key: string): File | null {
  const v = fd.get(key);
  return v instanceof File && v.size > 0 ? v : null;
}

function validatePhoto(file: File): void {
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error("Photo must be 5 MB or smaller.");
  }
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    throw new Error("Photo must be JPG, PNG, or WebP.");
  }
}

export async function login(formData: FormData) {
  const password = getString(formData, "password");
  const next = getString(formData, "next") || "/admin";
  const secret = process.env.ADMIN_PASSWORD;

  if (!secret) {
    redirect("/admin/login?error=config");
  }
  if (password !== secret) {
    redirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const { token, expires } = await createSessionToken(secret);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function createItem(formData: FormData) {
  const file = getFile(formData, "photo");
  let photoUrl: string | undefined;
  if (file) {
    validatePhoto(file);
    photoUrl = await uploadPhoto(file);
  }

  const now = new Date().toISOString();
  const item: StoredItem = {
    id: crypto.randomUUID(),
    title: requireField(formData, "title"),
    description: getString(formData, "description"),
    value: getString(formData, "value"),
    providedBy: requireField(formData, "providedBy"),
    photoUrl,
    createdAt: now,
    updatedAt: now,
  };

  const items = await readItems();
  items.push(item);
  await writeItems(items);

  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateItem(formData: FormData) {
  const id = requireField(formData, "id");
  const items = await readItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    redirect("/admin");
  }
  const existing = items[idx];

  let photoUrl = existing.photoUrl;
  const file = getFile(formData, "photo");
  if (file) {
    validatePhoto(file);
    const uploaded = await uploadPhoto(file);
    if (existing.photoUrl) await deletePhoto(existing.photoUrl);
    photoUrl = uploaded;
  } else if (formData.get("removePhoto") === "1" && existing.photoUrl) {
    await deletePhoto(existing.photoUrl);
    photoUrl = undefined;
  }

  items[idx] = {
    ...existing,
    title: requireField(formData, "title"),
    description: getString(formData, "description"),
    value: getString(formData, "value"),
    providedBy: requireField(formData, "providedBy"),
    photoUrl,
    updatedAt: new Date().toISOString(),
  };

  await writeItems(items);
  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteItem(formData: FormData) {
  const id = getString(formData, "id");
  if (!id) redirect("/admin");

  const items = await readItems();
  const target = items.find((i) => i.id === id);
  if (target?.photoUrl) await deletePhoto(target.photoUrl);

  await writeItems(items.filter((i) => i.id !== id));
  revalidatePath("/auction");
  revalidatePath("/admin");
  redirect("/admin");
}
