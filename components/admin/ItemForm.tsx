"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import imageCompression from "browser-image-compression";
import type { AuctionItem } from "@/lib/auction";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().optional(),
  value: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || Number.isFinite(Number(v.replace(/[$,]/g, ""))),
      "Value must be a number, or leave blank for “Priceless.”",
    ),
  donor: z.string().trim().optional(),
  display_order: z.coerce
    .number()
    .int("Display order must be a whole number.")
    .min(0, "Display order can’t be negative."),
  status: z.enum(["draft", "published"]),
});

type FormValues = z.input<typeof schema>;

interface ItemFormProps {
  action: (formData: FormData) => Promise<{ error: string } | void>;
  item?: AuctionItem;
  submitLabel: string;
}

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-[var(--color-bg-maroon)] focus:ring-1 focus:ring-[var(--color-bg-maroon)]";
const labelClass = "flex flex-col gap-2 text-sm font-medium text-stone-700";
const errorClass = "text-xs font-normal text-red-600";

const COMPRESSION_OPTIONS = {
  maxWidthOrHeight: 1600,
  initialQuality: 0.8,
  useWebWorker: true,
};

function isRedirect(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest: unknown }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export function ItemForm({ action, item, submitLabel }: ItemFormProps) {
  const isEdit = Boolean(item);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? "",
      description: item?.description ?? "",
      value: item?.value != null ? String(item.value) : "",
      donor: item?.donor ?? "",
      display_order: item?.display_order ?? 0,
      status: item?.status ?? "draft",
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: FormValues) {
    setServerError(null);
    setSubmitting(true);

    const fd = new FormData();
    if (item) fd.set("id", item.id);
    fd.set("title", values.title);
    fd.set("description", values.description ?? "");
    fd.set("value", values.value ?? "");
    fd.set("donor", values.donor ?? "");
    fd.set("display_order", String(values.display_order));
    fd.set("status", values.status);
    if (removeImage) fd.set("removeImage", "1");

    if (file) {
      try {
        const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
        fd.set("image", compressed, compressed.name || file.name);
      } catch {
        setServerError("Could not process that image. Try a different file.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const result = await action(fd);
      if (result?.error) {
        setServerError(result.error);
        setSubmitting(false);
      }
      // On success the action redirects — navigation handles the rest.
    } catch (err) {
      if (isRedirect(err)) throw err;
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <label className={labelClass}>
        <span>Title *</span>
        <input type="text" {...register("title")} className={inputClass} />
        {errors.title && <span className={errorClass}>{errors.title.message}</span>}
      </label>

      <label className={labelClass}>
        <span>Description</span>
        <textarea
          rows={4}
          {...register("description")}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span>Value (USD)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="1200 — blank for Priceless"
            {...register("value")}
            className={inputClass}
          />
          {errors.value && <span className={errorClass}>{errors.value.message}</span>}
        </label>

        <label className={labelClass}>
          <span>Donor</span>
          <input
            type="text"
            placeholder="Shown as “Generously provided by …”"
            {...register("donor")}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span>Display order</span>
          <input
            type="number"
            min={0}
            step={1}
            {...register("display_order")}
            className={inputClass}
          />
          {errors.display_order && (
            <span className={errorClass}>{errors.display_order.message}</span>
          )}
        </label>

        <label className={labelClass}>
          <span>Status</span>
          <select {...register("status")} className={inputClass}>
            <option value="draft">Draft (hidden)</option>
            <option value="published">Published (live)</option>
          </select>
        </label>
      </div>

      <fieldset className="flex flex-col gap-3 rounded-md border border-stone-200 p-4">
        <legend className="px-2 text-sm font-medium text-stone-700">Image</legend>

        {item?.image_url && !removeImage && (
          <div className="flex items-start gap-4">
            {/* Plain img: admin-only, not subject to LCP rules. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image_url}
              alt={item.title}
              className="h-24 w-32 rounded-md border border-stone-200 object-cover"
            />
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={removeImage}
                onChange={(e) => setRemoveImage(e.target.checked)}
              />
              Remove current image
            </label>
          </div>
        )}

        <label className="flex flex-col gap-2 text-sm text-stone-700">
          <span>
            {item?.image_url ? "Replace image (optional)" : "Upload image (optional)"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              if (e.target.files?.[0]) setRemoveImage(false);
            }}
            className="text-sm"
          />
          <span className="text-xs text-stone-500">
            Compressed in your browser before upload (max 1600px, ~80% quality).
          </span>
        </label>
      </fieldset>

      {serverError && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[var(--color-bg-maroon)] px-5 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)] disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="font-display text-xs tracking-[0.25em] uppercase text-stone-600 underline-offset-4 hover:underline"
        >
          Cancel
        </Link>
      </div>

      <p className="text-xs text-stone-500">
        Fields marked * are required.
        {isEdit ? " Leave the image field empty to keep the current one." : ""}
      </p>
    </form>
  );
}
