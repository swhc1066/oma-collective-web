/**
 * Vercel Blob storage helpers for auction data.
 *
 * Items live as a single JSON file (`auction/items.json`) and photos live
 * alongside in `auction/photos/*`. Single-writer assumption: one admin edits
 * at a time. Concurrent edits would last-write-wins; acceptable for this scope.
 */

import { put, list, del } from "@vercel/blob";

const ITEMS_PATHNAME = "auction/items.json";

export type StoredItem = {
  id: string;
  title: string;
  description: string;
  value: string;
  providedBy: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

type ItemsFile = {
  version: 1;
  items: StoredItem[];
};

export async function readItems(): Promise<StoredItem[]> {
  try {
    const { blobs } = await list({ prefix: ITEMS_PATHNAME, limit: 1 });
    const blob = blobs.find((b) => b.pathname === ITEMS_PATHNAME);
    if (!blob) return [];
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as Partial<ItemsFile>;
    return Array.isArray(data.items) ? data.items : [];
  } catch (err) {
    console.error("readItems failed", err);
    return [];
  }
}

export async function writeItems(items: StoredItem[]): Promise<void> {
  const body: ItemsFile = { version: 1, items };
  await put(ITEMS_PATHNAME, JSON.stringify(body), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function uploadPhoto(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-z0-9._-]+/gi, "-").toLowerCase();
  const key = `auction/photos/${crypto.randomUUID()}-${safeName}`;
  const { url } = await put(key, file, { access: "public" });
  return url;
}

export async function deletePhoto(url: string): Promise<void> {
  try {
    await del(url);
  } catch (err) {
    console.warn("deletePhoto best-effort failed", err);
  }
}
