import { NextRequest, NextResponse } from "next/server";
import { kinto } from "../../../../lib/utils";
import { USDC_ABI } from "../../../../lib/utils";
import { Address, createPublicClient, http } from "viem";
import { formatUnits } from "viem";

const USDCAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;

async function getBalance(accountAddress: string) {
  console.log({USDCAddress})
  const client = createPublicClient({
    chain: kinto,
    transport: http(),
  });
  console.log({client})
  const data = await client.readContract({
    address: USDCAddress as Address,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  console.log(data)
  const balance = formatUnits(data, 18);
  return balance;
}

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    // const { searchParams } = new URL(request.url);
    const walletAddress = params.address;
    console.log(walletAddress)

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }

    const balance = await getBalance(walletAddress);
    console.log(balance)
    return NextResponse.json({ balance }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
