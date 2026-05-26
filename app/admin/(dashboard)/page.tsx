import Link from "next/link";
import { readItems } from "@/lib/storage/blob";
import { deleteItem } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminListPage() {
  const items = (await readItems())
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-wide text-stone-900">
            Auction Items
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {items.length} item{items.length === 1 ? "" : "s"} live at{" "}
            <Link href="/auction" className="underline" target="_blank">
              /auction
            </Link>
            .
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-md bg-[var(--color-bg-maroon)] px-4 py-2 font-display text-sm tracking-[0.25em] uppercase text-white transition hover:bg-[var(--color-inner-maroon)]"
        >
          Add item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-stone-300 p-10 text-center">
          <p className="font-display text-lg tracking-wide text-stone-700">
            No items yet
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Click &quot;Add item&quot; to create the first one.
          </p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md bg-stone-100">
                {item.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                    No photo
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display text-lg tracking-wide text-stone-900">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-sm text-stone-600">
                  {item.value && (
                    <>
                      <span className="font-medium">{item.value}</span>
                      <span className="mx-2 text-stone-400">·</span>
                    </>
                  )}
                  Provided by {item.providedBy}
                </p>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-stone-500">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/${item.id}/edit`}
                  className="rounded-md border border-stone-300 px-3 py-1.5 font-display text-xs tracking-[0.25em] uppercase text-stone-700 hover:bg-stone-100"
                >
                  Edit
                </Link>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 font-display text-xs tracking-[0.25em] uppercase text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
