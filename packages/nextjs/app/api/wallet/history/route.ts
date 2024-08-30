import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { Transaction } from "~~/app/lib/interfaces";

export const runtime = "edge";

function validateAddress(address: unknown): string {
  if (typeof address !== "string" || address.trim() === "") {
    throw new Error("Invalid address: must be a non-empty string");
  }
  return address.trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = validateAddress(searchParams.get("walletAddress"));

    const { data: sentTransactions, error: sentError } = await supabase
      .from("transactions")
      .select("id, created_at, amount, to")
      .eq("from", address)
      .order("created_at", { ascending: false });

    if (sentError) throw new Error(`Error fetching sent transactions: ${sentError.message}`);

    const { data: receivedTransactions, error: receivedError } = await supabase
      .from("transactions")
      .select("id, created_at, amount, from")
      .eq("to", address)
      .order("created_at", { ascending: false });

    if (receivedError) throw new Error(`Error fetching received transactions: ${receivedError.message}`);

    const formattedTransactions: Transaction[] = [
      ...(sentTransactions?.map(tx => ({
        id: tx.id,
        type: "sent" as const,
        to: tx.to,
        amount: Number(tx.amount),
        created_at: tx.created_at,
      })) ?? []),
      ...(receivedTransactions?.map(tx => ({
        id: tx.id,
        type: "received" as const,
        from: tx.from,
        amount: Number(tx.amount),
        created_at: tx.created_at,
      })) ?? []),
    ];

    formattedTransactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(formattedTransactions);
  } catch (error) {
    console.error("Error in transaction history API:", error);
    if (error instanceof Error && error.message.startsWith("Invalid address")) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
