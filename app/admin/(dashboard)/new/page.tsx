import Link from "next/link";
import { ItemForm } from "@/components/admin/ItemForm";
import { createLot } from "../../actions";

export default function NewLotPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin"
          className="font-display text-xs tracking-[0.25em] uppercase text-stone-600 underline-offset-4 hover:underline"
        >
          ← Back to lots
        </Link>
        <h1 className="mt-2 font-display text-3xl tracking-wide text-stone-900">
          New Auction Lot
        </h1>
      </div>

      <ItemForm action={createLot} submitLabel="Create lot" />
    </div>
  );
}
