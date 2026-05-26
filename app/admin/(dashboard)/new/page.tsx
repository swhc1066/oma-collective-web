import Link from "next/link";
import { ItemForm } from "@/components/admin/ItemForm";
import { createItem } from "../../actions";

export default function NewItemPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin"
          className="font-display text-xs tracking-[0.25em] uppercase text-stone-600 underline-offset-4 hover:underline"
        >
          ← Back to items
        </Link>
        <h1 className="mt-2 font-display text-3xl tracking-wide text-stone-900">
          Add Auction Item
        </h1>
      </div>

      <ItemForm action={createItem} submitLabel="Add item" />
    </div>
  );
}
