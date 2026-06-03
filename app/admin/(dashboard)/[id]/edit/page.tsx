import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemForm } from "@/components/admin/ItemForm";
import type { AuctionItem } from "@/lib/auction";
import { createClient } from "@/lib/supabase/server";
import { updateLot } from "../../../actions";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";

export default async function EditLotPage({ params }: { params: Params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from("auction_lots")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const item = data as AuctionItem;

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
          Edit Auction Lot
        </h1>
      </div>

      <ItemForm action={updateLot} item={item} submitLabel="Save changes" />
    </div>
  );
}
