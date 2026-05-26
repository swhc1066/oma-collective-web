import Link from "next/link";
import type { StoredItem } from "@/lib/storage/blob";

interface ItemFormProps {
  action: (formData: FormData) => Promise<void>;
  item?: StoredItem;
  submitLabel: string;
}

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-[var(--color-bg-maroon)] focus:ring-1 focus:ring-[var(--color-bg-maroon)]";

const labelClass = "flex flex-col gap-2 text-sm font-medium text-stone-700";

export function ItemForm({ action, item, submitLabel }: ItemFormProps) {
  const isEdit = Boolean(item);

  return (
    <form action={action} encType="multipart/form-data" className="flex flex-col gap-6">
      {item && <input type="hidden" name="id" value={item.id} />}

      <label className={labelClass}>
        <span>Title *</span>
        <input
          type="text"
          name="title"
          required
          defaultValue={item?.title ?? ""}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span>Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={item?.description ?? ""}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span>Value</span>
          <input
            type="text"
            name="value"
            placeholder="$1,200 or Priceless"
            defaultValue={item?.value ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          <span>Provided by *</span>
          <input
            type="text"
            name="providedBy"
            required
            defaultValue={item?.providedBy ?? ""}
            className={inputClass}
          />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3 rounded-md border border-stone-200 p-4">
        <legend className="px-2 text-sm font-medium text-stone-700">Photo</legend>

        {item?.photoUrl && (
          <div className="flex items-start gap-4">
            {/* Plain img is fine here; admin only, not subject to LCP rules. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.photoUrl}
              alt={item.title}
              className="h-24 w-32 rounded-md border border-stone-200 object-cover"
            />
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" name="removePhoto" value="1" />
              Remove current photo
            </label>
          </div>
        )}

        <label className="flex flex-col gap-2 text-sm text-stone-700">
          <span>{item?.photoUrl ? "Replace photo (optional)" : "Upload photo (optional)"}</span>
          <input
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp"
            className="text-sm"
          />
          <span className="text-xs text-stone-500">JPG, PNG, or WebP. Max 5 MB.</span>
        </label>
      </fieldset>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-[var(--color-bg-maroon)] px-5 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)]"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin"
          className="font-display text-xs tracking-[0.25em] uppercase text-stone-600 underline-offset-4 hover:underline"
        >
          Cancel
        </Link>
      </div>

      <p className="text-xs text-stone-500">
        Fields marked * are required.{isEdit ? " Leave the photo field empty to keep the current image." : ""}
      </p>
    </form>
  );
}
