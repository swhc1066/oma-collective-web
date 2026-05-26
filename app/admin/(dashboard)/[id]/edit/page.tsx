import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemForm } from "@/components/admin/ItemForm";
import { readItems } from "@/lib/storage/blob";
import { updateItem } from "../../../actions";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";

export default async function EditItemPage({ params }: { params: Params }) {
  const { id } = await params;
  const items = await readItems();
  const item = items.find((i) => i.id === id);
  if (!item) notFound();

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
          Edit Auction Item
        </h1>
      </div>

      <ItemForm action={updateItem} item={item} submitLabel="Save changes" />
    </div>
  );
}
