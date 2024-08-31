import { NextRequest, NextResponse } from "next/server";
import { kinto,LOAN_ABI } from "../../../../lib/utils";
import { Address, createPublicClient, http } from "viem";
import { formatUnits } from "viem";

const LoanAddres = process.env.NEXT_PUBLIC_LOAN_ADDRESS;

async function getCredit(accountAddress: string) {
  const client = createPublicClient({
    chain: kinto,
    transport: http(),
  });
  const data = await client.readContract({
    address: LoanAddres as Address,
    abi: LOAN_ABI,
    functionName: "get_credit_limit",
    args: [accountAddress],
  });
  const credit = formatUnits(data as bigint, 18);
  return credit;
}

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    // const { searchParams } = new URL(request.url);
    const walletAddress = params.address;

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    // Basic validation for wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }

    const credit = await getCredit(walletAddress);

    return NextResponse.json({ credit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
