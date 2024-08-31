export const runtime = "edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "../../../lib/supabase";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const walletAddress = searchParams.get("walletAddress");
  const phoneNumber = searchParams.get("phoneNumber");

  if (!email && !walletAddress && !phoneNumber) {
    return NextResponse.json({ error: "At least one identifier is required" }, { status: 400 });
  }

  try {
    let query = supabase.from("users").select("*");

    if (email) query = query.eq("email", email);
    if (walletAddress) query = query.eq("wallet_address", walletAddress);
    if (phoneNumber) query = query.eq("phone_number", phoneNumber);

    const { data, error } = await query.single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      throw error;
    }

    const { email: userEmail, wallet_address, phone_number, is_merchant, name } = data;
    return NextResponse.json(
      {
        email: userEmail,
        walletAddress: wallet_address,
        phoneNumber: phone_number,
        isMerchant: is_merchant,
        name: name,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  // Method not allowed
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
