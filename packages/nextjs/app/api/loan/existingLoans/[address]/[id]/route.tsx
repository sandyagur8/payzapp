import { NextRequest, NextResponse } from "next/server";
import { LOAN_ABI, kinto,Loan } from "../../../../../lib/utils";
import { Address, createPublicClient, http } from "viem";

// import { formatUnits } from "viem";




const LoanAddres = process.env.NEXT_PUBLIC_LOAN_ADDRESS;

async function getLoan(accountAddress: string, id: number) {
  const client = createPublicClient({
    chain: kinto,
    transport: http(),
  });
  const data = await client.readContract({
    address: LoanAddres as Address,
    abi: LOAN_ABI,
    functionName: "get_loan_by_id",
    args: [accountAddress, id],
  });
  return data;
}

export async function GET(request: NextRequest, { params }: { params: { address: string; id: string } }) {
  try {
    const walletAddress = params.address;
    const id = Number(params.id);

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid number of loans" }, { status: 400 });
    }

    // Basic validation for wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }

    try {
      const loan = await getLoan(walletAddress, id);
      console.log(loan);
      return NextResponse.json({ loan }, { status: 200 });
    } catch (e) {
      const responseData : Loan = {
        id:"0",amount:0,remainingAmount:0, nextTenureDate:"0", remainingTenures:0, tenureAmount:0
      }
      return NextResponse.json({ data:responseData}, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
